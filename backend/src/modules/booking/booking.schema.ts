// =============================================
// Barbearia Vikings — Booking Zod Schemas
// =============================================

import { z } from 'zod';

export const createBookingSchema = z.object({
  clientName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  clientPhone: z.string().min(8, 'Telefone inválido'),
  clientEmail: z.string().email().optional(),
  barberId: z.string().uuid('ID do barbeiro inválido'),
  serviceId: z.string().uuid('ID do serviço inválido'),
  startTime: z.string().datetime({ message: 'Formato ISO 8601 esperado' }),
  notes: z.string().optional(),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']),
});

export const bookingFiltersSchema = z.object({
  barberId: z.string().uuid().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
export type BookingFiltersInput = z.infer<typeof bookingFiltersSchema>;
