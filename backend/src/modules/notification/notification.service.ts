// =============================================
// Barbearia Vikings — Notification Service
// Prepared for future WhatsApp / SMS integration
// =============================================

import { prisma } from '../../config/database';
import { NotificationStatus } from '@prisma/client';
import type { NotificationFiltersInput, WebhookInput } from './notification.schema';

/**
 * Strategy interface for notification channels.
 * When WhatsApp is implemented, create a WhatsAppChannel class.
 */
interface NotificationChannel {
  send(payload: string): Promise<{ success: boolean; externalId?: string }>;
}

/**
 * Internal channel — logs only (current implementation).
 */
class InternalChannel implements NotificationChannel {
  async send(payload: string) {
    console.log('[NOTIFICATION:INTERNAL]', payload);
    return { success: true };
  }
}

// Future: class WhatsAppChannel implements NotificationChannel { ... }
// Future: class SMSChannel implements NotificationChannel { ... }

const channels: Record<string, NotificationChannel> = {
  INTERNAL: new InternalChannel(),
  // WHATSAPP: new WhatsAppChannel(),
  // SMS: new SMSChannel(),
};

export class NotificationService {
  async findAll(filters: NotificationFiltersInput) {
    const where: any = {};

    if (filters.status) where.status = filters.status;
    if (filters.channel) where.channel = filters.channel;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        include: {
          booking: {
            select: {
              id: true,
              startTime: true,
              client: { select: { name: true, phone: true } },
              user: { select: { name: true } },
              service: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (filters.page - 1) * filters.pageSize,
        take: filters.pageSize,
      }),
      prisma.notification.count({ where }),
    ]);

    return { notifications, total, page: filters.page, pageSize: filters.pageSize };
  }

  /**
   * Process pending notifications.
   * In production, this would be triggered by a cron job or queue worker.
   */
  async processPending() {
    const pending = await prisma.notification.findMany({
      where: { status: NotificationStatus.PENDING },
      take: 50,
    });

    let processed = 0;

    for (const notification of pending) {
      const channel = channels[notification.channel];
      if (!channel) continue;

      try {
        const result = await channel.send(notification.payload || '');

        await prisma.notification.update({
          where: { id: notification.id },
          data: {
            status: result.success ? NotificationStatus.SENT : NotificationStatus.FAILED,
            sentAt: result.success ? new Date() : undefined,
          },
        });

        processed++;
      } catch (error) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: NotificationStatus.FAILED },
        });
      }
    }

    return { processed, total: pending.length };
  }

  /**
   * Handle webhook from WhatsApp (future implementation).
   */
  async handleWebhook(data: WebhookInput) {
    console.log('[WEBHOOK] WhatsApp callback received:', data);
    // Future: update notification status based on delivery reports
    return { received: true };
  }
}

export const notificationService = new NotificationService();
