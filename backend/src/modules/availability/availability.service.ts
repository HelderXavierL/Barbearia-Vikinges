// =============================================
// Barbearia Vikings — Availability Service
// =============================================

import { prisma } from '../../config/database';
import { BookingStatus } from '@prisma/client';
import { generateTimeSlots, timeStringToDate, addMinutes, startOfDay, endOfDay, hasTimeConflict } from '../../utils/timeSlots';
import { SLOT_DURATION_MINUTES } from '@vikinges/shared';
import type { SetAvailabilityInput, CreateExceptionInput } from './availability.schema';

export class AvailabilityService {
  /**
   * Get the weekly schedule for a barber.
   */
  async getSchedule(barberId: string) {
    return prisma.availability.findMany({
      where: { userId: barberId },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  /**
   * Set/replace the full weekly schedule for a barber.
   */
  async setSchedule(barberId: string, data: SetAvailabilityInput) {
    return prisma.$transaction(async (tx) => {
      // Delete existing schedule
      await tx.availability.deleteMany({ where: { userId: barberId } });

      // Create new schedule
      await tx.availability.createMany({
        data: data.schedules.map((s) => ({
          userId: barberId,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          active: s.active,
        })),
      });

      return tx.availability.findMany({
        where: { userId: barberId },
        orderBy: { dayOfWeek: 'asc' },
      });
    });
  }

  /**
   * Get availability exceptions for a barber.
   */
  async getExceptions(barberId: string) {
    return prisma.availabilityException.findMany({
      where: {
        userId: barberId,
        date: { gte: new Date() },
      },
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Create an availability exception (day off, holiday, etc.).
   */
  async createException(barberId: string, data: CreateExceptionInput) {
    return prisma.availabilityException.upsert({
      where: {
        userId_date: {
          userId: barberId,
          date: new Date(data.date),
        },
      },
      update: {
        isBlocked: data.isBlocked,
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason,
      },
      create: {
        userId: barberId,
        date: new Date(data.date),
        isBlocked: data.isBlocked,
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason,
      },
    });
  }

  /**
   * Delete an availability exception.
   */
  async deleteException(exceptionId: string) {
    return prisma.availabilityException.delete({
      where: { id: exceptionId },
    });
  }

  /**
   * Calculate available time slots for a barber on a specific date.
   * This is the core scheduling engine.
   */
  async getAvailableSlots(barberId: string, dateStr: string) {
    const date = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat

    // 1. Get the barber's schedule for this day of the week
    const schedule = await prisma.availability.findUnique({
      where: {
        userId_dayOfWeek: {
          userId: barberId,
          dayOfWeek,
        },
      },
    });

    // No schedule for this day = no slots
    if (!schedule || !schedule.active) {
      return [];
    }

    // 2. Check for exceptions on this specific date
    const exception = await prisma.availabilityException.findUnique({
      where: {
        userId_date: {
          userId: barberId,
          date: new Date(dateStr),
        },
      },
    });

    // Full day blocked
    if (exception?.isBlocked && !exception.startTime) {
      return [];
    }

    // 3. Determine working hours (considering partial exceptions)
    let workStart = schedule.startTime;
    let workEnd = schedule.endTime;

    if (exception?.isBlocked && exception.startTime && exception.endTime) {
      // Partial block — we'll handle this by filtering slots later
    } else if (exception && !exception.isBlocked && exception.startTime && exception.endTime) {
      // Custom hours for this day
      workStart = exception.startTime;
      workEnd = exception.endTime;
    }

    // 4. Generate all possible slots
    const allSlots = generateTimeSlots(workStart, workEnd, SLOT_DURATION_MINUTES);

    // 5. Get existing bookings for this barber on this date
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const bookings = await prisma.booking.findMany({
      where: {
        userId: barberId,
        startTime: { gte: dayStart, lte: dayEnd },
        status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      },
      select: { startTime: true, endTime: true },
    });

    // 6. Filter out slots that conflict with existing bookings or partial exceptions
    const now = new Date();

    const availableSlots = allSlots.filter((slotTime) => {
      const slotStart = timeStringToDate(date, slotTime);
      const slotEnd = addMinutes(slotStart, SLOT_DURATION_MINUTES);

      // Don't show past slots
      if (slotStart <= now) return false;

      // Check partial exception block
      if (exception?.isBlocked && exception.startTime && exception.endTime) {
        const exceptStart = timeStringToDate(date, exception.startTime);
        const exceptEnd = timeStringToDate(date, exception.endTime);
        if (hasTimeConflict(slotStart, slotEnd, exceptStart, exceptEnd)) {
          return false;
        }
      }

      // Check booking conflicts
      for (const booking of bookings) {
        if (hasTimeConflict(slotStart, slotEnd, booking.startTime, booking.endTime)) {
          return false;
        }
      }

      return true;
    });

    return availableSlots.map((time) => ({ time, available: true }));
  }
}

export const availabilityService = new AvailabilityService();
