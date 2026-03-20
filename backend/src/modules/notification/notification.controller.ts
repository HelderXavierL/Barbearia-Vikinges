// =============================================
// Barbearia Vikings — Notification Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { notificationService } from './notification.service';
import { sendSuccess, sendPaginated } from '../../utils/apiResponse';

export class NotificationController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await notificationService.findAll(req.query as any);
      return sendPaginated(res, result.notifications, result.total, result.page, result.pageSize);
    } catch (error) {
      next(error);
    }
  }

  async processPending(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await notificationService.processPending();
      return sendSuccess(res, result, `${result.processed} notificações processadas`);
    } catch (error) {
      next(error);
    }
  }

  async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await notificationService.handleWebhook(req.body);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
