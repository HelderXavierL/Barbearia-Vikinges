// =============================================
// Barbearia Vikings — Availability Zod Schemas
// =============================================

import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const setAvailabilitySchema = z.object({
  schedules: z.array(
    z.object({
      dayOfWeek: z.number().int().min(0).max(6),
      startTime: z.string().regex(timeRegex, 'Formato: HH:mm'),
      endTime: z.string().regex(timeRegex, 'Formato: HH:mm'),
      active: z.boolean().default(true),
    }),
  ).min(1, 'Informe ao menos um horário'),
});

export const createExceptionSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato: YYYY-MM-DD'),
  isBlocked: z.boolean().default(true),
  startTime: z.string().regex(timeRegex).optional(),
  endTime: z.string().regex(timeRegex).optional(),
  reason: z.string().optional(),
});

export const slotsQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato: YYYY-MM-DD'),
});

export type SetAvailabilityInput = z.infer<typeof setAvailabilitySchema>;
export type CreateExceptionInput = z.infer<typeof createExceptionSchema>;
