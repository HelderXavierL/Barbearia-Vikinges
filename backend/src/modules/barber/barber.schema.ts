// =============================================
// Barbearia Vikings — Barber Zod Schemas
// =============================================

import { z } from 'zod';

export const createBarberSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  phone: z.string().min(8, 'Telefone inválido'),
  avatarUrl: z.string().url().optional(),
  serviceIds: z.array(z.string().uuid()).optional(),
});

export const updateBarberSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional(),
  avatarUrl: z.string().url().nullable().optional(),
  active: z.boolean().optional(),
  serviceIds: z.array(z.string().uuid()).optional(),
});

export type CreateBarberInput = z.infer<typeof createBarberSchema>;
export type UpdateBarberInput = z.infer<typeof updateBarberSchema>;
