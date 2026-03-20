// =============================================
// Barbearia Vikings — Booking Service
// =============================================

import { prisma } from '../../config/database';
import { BookingStatus, NotificationType, NotificationChannel, NotificationStatus } from '@prisma/client';
import { RECURRING_THRESHOLD, MAX_ADVANCE_DAYS, MIN_CANCEL_HOURS } from '@vikinges/shared';
import { addMinutes, startOfDay, endOfDay } from '../../utils/timeSlots';
import type { CreateBookingInput, UpdateBookingStatusInput, BookingFiltersInput } from './booking.schema';

export class BookingService {
  /**
   * Create a booking with full conflict prevention using a transaction.
   * This is the critical path — must prevent double-booking.
   */
  async create(data: CreateBookingInput) {
    const startTime = new Date(data.startTime);

    // Validate: not in the past
    if (startTime <= new Date()) {
      throw Object.assign(new Error('Não é possível agendar em horários passados'), { statusCode: 400 });
    }

    // Validate: not too far in the future
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + MAX_ADVANCE_DAYS);
    if (startTime > maxDate) {
      throw Object.assign(
        new Error(`Agendamentos podem ser feitos com até ${MAX_ADVANCE_DAYS} dias de antecedência`),
        { statusCode: 400 },
      );
    }

    // Get service duration
    const service = await prisma.service.findUnique({ where: { id: data.serviceId } });
    if (!service || !service.active) {
      throw Object.assign(new Error('Serviço não encontrado ou inativo'), { statusCode: 404 });
    }

    const endTime = addMinutes(startTime, service.durationMinutes);

    // Verify barber exists and is active
    const barber = await prisma.user.findUnique({ where: { id: data.barberId } });
    if (!barber || !barber.active) {
      throw Object.assign(new Error('Barbeiro não encontrado ou inativo'), { statusCode: 404 });
    }

    // Verify barber offers this service
    const barberService = await prisma.barberService.findUnique({
      where: {
        userId_serviceId: {
          userId: data.barberId,
          serviceId: data.serviceId,
        },
      },
    });
    if (!barberService) {
      throw Object.assign(
        new Error('Este barbeiro não oferece o serviço selecionado'),
        { statusCode: 400 },
      );
    }

    // === TRANSACTION with conflict check ===
    return prisma.$transaction(async (tx) => {
      // Check for conflicting bookings (pessimistic approach)
      const conflicting = await tx.booking.findFirst({
        where: {
          userId: data.barberId,
          status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          OR: [
            {
              startTime: { lt: endTime },
              endTime: { gt: startTime },
            },
          ],
        },
      });

      if (conflicting) {
        throw Object.assign(
          new Error('Este horário já está reservado. Por favor, escolha outro.'),
          { statusCode: 409 },
        );
      }

      // Find or create client
      let client = await tx.client.findUnique({
        where: { phone: data.clientPhone },
      });

      if (client) {
        // Update name if provided
        client = await tx.client.update({
          where: { id: client.id },
          data: {
            name: data.clientName,
            email: data.clientEmail || client.email,
          },
        });
      } else {
        client = await tx.client.create({
          data: {
            name: data.clientName,
            phone: data.clientPhone,
            email: data.clientEmail,
          },
        });
      }

      // Create booking
      const booking = await tx.booking.create({
        data: {
          clientId: client.id,
          userId: data.barberId,
          serviceId: data.serviceId,
          startTime,
          endTime,
          status: BookingStatus.CONFIRMED,
          notes: data.notes,
        },
        include: {
          client: true,
          user: { select: { id: true, name: true, phone: true } },
          service: true,
        },
      });

      // Create notification record (prepared for WhatsApp)
      await tx.notification.create({
        data: {
          bookingId: booking.id,
          channel: NotificationChannel.INTERNAL,
          type: NotificationType.CONFIRMATION,
          status: NotificationStatus.PENDING,
          payload: JSON.stringify({
            clientName: client.name,
            clientPhone: client.phone,
            barberName: barber.name,
            serviceName: service.name,
            date: startTime.toISOString(),
            duration: service.durationMinutes,
          }),
        },
      });

      return booking;
    });
  }

  /**
   * List bookings with filters and pagination.
   */
  async findAll(filters: BookingFiltersInput, userId?: string, userRole?: string) {
    const where: any = {};

    // Barbers can only see their own bookings
    if (userRole === 'BARBER') {
      where.userId = userId;
    } else if (filters.barberId) {
      where.userId = filters.barberId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.date) {
      const date = new Date(filters.date);
      where.startTime = {
        gte: startOfDay(date),
        lte: endOfDay(date),
      };
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          client: { select: { id: true, name: true, phone: true, isRecurring: true } },
          user: { select: { id: true, name: true } },
          service: { select: { id: true, name: true, price: true } },
        },
        orderBy: { startTime: 'asc' },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
      }),
      prisma.booking.count({ where }),
    ]);

    return { bookings, total, page: filters.page, pageSize: filters.pageSize };
  }

  /**
   * Get a single booking by ID.
   */
  async findById(id: string) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        client: true,
        user: { select: { id: true, name: true, phone: true, avatarUrl: true } },
        service: true,
        notifications: true,
      },
    });

    if (!booking) {
      throw Object.assign(new Error('Agendamento não encontrado'), { statusCode: 404 });
    }

    return booking;
  }

  /**
   * Update booking status with business rule validation.
   */
  async updateStatus(id: string, data: UpdateBookingStatusInput) {
    const booking = await this.findById(id);

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      PENDING: ['CONFIRMED', 'CANCELLED'],
      CONFIRMED: ['COMPLETED', 'CANCELLED', 'NO_SHOW'],
      CANCELLED: [],
      COMPLETED: [],
      NO_SHOW: [],
    };

    if (!validTransitions[booking.status]?.includes(data.status)) {
      throw Object.assign(
        new Error(`Não é possível alterar de ${booking.status} para ${data.status}`),
        { statusCode: 400 },
      );
    }

    // Cancellation time check (for client-initiated cancellations)
    if (data.status === 'CANCELLED') {
      const hoursUntil = (booking.startTime.getTime() - Date.now()) / (1000 * 60 * 60);
      if (hoursUntil < MIN_CANCEL_HOURS) {
        throw Object.assign(
          new Error(`Cancelamento permitido apenas até ${MIN_CANCEL_HOURS}h antes do horário`),
          { statusCode: 400 },
        );
      }
    }

    return prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id },
        data: { status: data.status as BookingStatus },
        include: {
          client: true,
          user: { select: { id: true, name: true } },
          service: true,
        },
      });

      // If completed, update client stats
      if (data.status === 'COMPLETED') {
        const client = await tx.client.update({
          where: { id: booking.clientId },
          data: {
            totalBookings: { increment: 1 },
            lastVisit: new Date(),
          },
        });

        // Auto-tag as recurring
        if (client.totalBookings >= RECURRING_THRESHOLD && !client.isRecurring) {
          await tx.client.update({
            where: { id: client.id },
            data: { isRecurring: true },
          });
        }
      }

      // Create cancellation notification
      if (data.status === 'CANCELLED') {
        await tx.notification.create({
          data: {
            bookingId: id,
            channel: NotificationChannel.INTERNAL,
            type: NotificationType.CANCELLATION,
            status: NotificationStatus.PENDING,
          },
        });
      }

      return updated;
    });
  }

  /**
   * Get barber's agenda for a specific day.
   */
  async getBarberDayAgenda(barberId: string, dateStr: string) {
    const date = new Date(dateStr);
    return prisma.booking.findMany({
      where: {
        userId: barberId,
        startTime: { gte: startOfDay(date), lte: endOfDay(date) },
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
      include: {
        client: { select: { id: true, name: true, phone: true, isRecurring: true } },
        service: { select: { id: true, name: true } },
      },
      orderBy: { startTime: 'asc' },
    });
  }
}

export const bookingService = new BookingService();
