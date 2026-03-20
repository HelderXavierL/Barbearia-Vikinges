// =============================================
// Barbearia Vikings — Service Service
// =============================================

import { prisma } from '../../config/database';
import type { CreateServiceInput, UpdateServiceInput } from './service.schema';

export class ServiceService {
  async findAll(activeOnly = true) {
    return prisma.service.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findById(id: string) {
    const service = await prisma.service.findUnique({
      where: { id },
      include: {
        barbers: {
          include: { user: { select: { id: true, name: true } } },
        },
      },
    });

    if (!service) {
      throw Object.assign(new Error('Serviço não encontrado'), { statusCode: 404 });
    }

    return service;
  }

  async create(data: CreateServiceInput) {
    return prisma.service.create({ data });
  }

  async update(id: string, data: UpdateServiceInput) {
    await this.findById(id);
    return prisma.service.update({ where: { id }, data });
  }

  async softDelete(id: string) {
    await this.findById(id);
    return prisma.service.update({
      where: { id },
      data: { active: false },
    });
  }
}

export const serviceService = new ServiceService();
