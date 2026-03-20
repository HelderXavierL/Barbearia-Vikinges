// =============================================
// Barbearia Vikings — Client Zod Schemas
// =============================================

import { z } from 'zod';

export const updateClientSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(8).optional(),
  email: z.string().email().nullable().optional(),
});

export const clientFiltersSchema = z.object({
  search: z.string().optional(),
  recurring: z.coerce.boolean().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type ClientFiltersInput = z.infer<typeof clientFiltersSchema>;
