// =============================================
// Barbearia Vikings — Product Zod Schemas
// =============================================

import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  price: z.number().positive('Preço deve ser positivo'),
  stockQuantity: z.number().int().min(0).default(0),
  stockMin: z.number().int().min(0).default(5),
  imageUrl: z.string().url().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
  price: z.number().positive().optional(),
  stockMin: z.number().int().min(0).optional(),
  imageUrl: z.string().url().nullable().optional(),
  active: z.boolean().optional(),
});

export const stockMovementSchema = z.object({
  type: z.enum(['IN', 'OUT', 'ADJUSTMENT']),
  quantity: z.number().int().positive('Quantidade deve ser positiva'),
  reason: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type StockMovementInput = z.infer<typeof stockMovementSchema>;
