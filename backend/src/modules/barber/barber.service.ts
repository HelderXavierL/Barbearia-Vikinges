// =============================================
// Barbearia Vikings — Barber Service
// =============================================

import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { UserRole, BookingStatus } from '@prisma/client';
import type { CreateBarberInput, UpdateBarberInput } from './barber.schema';

export class BarberService {
  async findAll(serviceId?: string) {
    const where: any = { active: true, role: { in: [UserRole.BARBER, UserRole.ADMIN] } };

    if (serviceId) {
      where.services = { some: { serviceId } };
    }

    return prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
        services: {
          include: { service: { select: { id: true, name: true } } },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    const barber = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
        services: {
          include: { service: { select: { id: true, name: true, price: true } } },
        },
        availabilities: true,
      },
    });

    if (!barber) {
      throw Object.assign(new Error('Barbeiro não encontrado'), { statusCode: 404 });
    }

    return barber;
  }

  async create(data: CreateBarberInput) {
    const passwordHash = await bcrypt.hash(data.password, 12);

    return prisma.$transaction(async (tx) => {
      const barber = await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash,
          phone: data.phone,
          role: UserRole.BARBER,
          avatarUrl: data.avatarUrl,
        },
      });

      if (data.serviceIds?.length) {
        await tx.barberService.createMany({
          data: data.serviceIds.map((serviceId) => ({
            userId: barber.id,
            serviceId,
          })),
        });
      }

      return this.findById(barber.id);
    });
  }

  async update(id: string, data: UpdateBarberInput) {
    await this.findById(id);

    return prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id },
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatarUrl: data.avatarUrl,
          active: data.active,
        },
      });

      if (data.serviceIds !== undefined) {
        await tx.barberService.deleteMany({ where: { userId: id } });

        if (data.serviceIds.length) {
          await tx.barberService.createMany({
            data: data.serviceIds.map((serviceId) => ({
              userId: id,
              serviceId,
            })),
          });
        }
      }

      // If deactivating, cancel future bookings
      if (data.active === false) {
        await tx.booking.updateMany({
          where: {
            userId: id,
            startTime: { gt: new Date() },
            status: { in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
          },
          data: { status: BookingStatus.CANCELLED },
        });
      }

      return this.findById(id);
    });
  }

  async softDelete(id: string) {
    return this.update(id, { active: false });
  }
}

export const barberService = new BarberService();
