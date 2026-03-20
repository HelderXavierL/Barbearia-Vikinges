// =============================================
// Barbearia Vikings — Service Zod Schemas
// =============================================

import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  price: z.number().positive('Preço deve ser positivo'),
  durationMinutes: z.number().int().min(10).max(240).default(35),
  imageUrl: z.string().url().optional(),
  sortOrder: z.number().int().default(0),
});

export const updateServiceSchema = createServiceSchema.partial().extend({
  active: z.boolean().optional(),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
