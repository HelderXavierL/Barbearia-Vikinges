// =============================================
// Barbearia Vikings — Notification Zod Schemas
// =============================================

import { z } from 'zod';

export const notificationFiltersSchema = z.object({
  status: z.enum(['PENDING', 'SENT', 'FAILED']).optional(),
  channel: z.enum(['INTERNAL', 'WHATSAPP', 'SMS']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export const webhookSchema = z.object({
  messageId: z.string(),
  status: z.enum(['delivered', 'read', 'failed']),
  timestamp: z.string(),
});

export type NotificationFiltersInput = z.infer<typeof notificationFiltersSchema>;
export type WebhookInput = z.infer<typeof webhookSchema>;
