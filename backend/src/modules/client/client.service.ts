// =============================================
// Barbearia Vikings — Client Service
// =============================================

import { prisma } from '../../config/database';
import type { UpdateClientInput, ClientFiltersInput } from './client.schema';

export class ClientService {
  async findAll(filters: ClientFiltersInput) {
    const where: any = {};

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { phone: { contains: filters.search } },
        { email: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    if (filters.recurring !== undefined) {
      where.isRecurring = filters.recurring;
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
      }),
      prisma.client.count({ where }),
    ]);

    return { clients, total, page: filters.page, pageSize: filters.pageSize };
  }

  async findById(id: string) {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            user: { select: { id: true, name: true } },
            service: { select: { id: true, name: true, price: true } },
          },
          orderBy: { startTime: 'desc' },
          take: 20,
        },
      },
    });

    if (!client) {
      throw Object.assign(new Error('Cliente não encontrado'), { statusCode: 404 });
    }

    return client;
  }

  async findByPhone(phone: string) {
    const client = await prisma.client.findUnique({
      where: { phone },
      include: {
        bookings: {
          orderBy: { startTime: 'desc' },
          take: 5,
          include: {
            service: { select: { name: true } },
          },
        },
      },
    });

    return client;
  }

  async update(id: string, data: UpdateClientInput) {
    await this.findById(id);
    return prisma.client.update({ where: { id }, data });
  }
}

export const clientService = new ClientService();
