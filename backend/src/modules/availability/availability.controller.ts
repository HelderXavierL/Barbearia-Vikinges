// =============================================
// Barbearia Vikings — Availability Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { availabilityService } from './availability.service';
import { sendSuccess, sendCreated } from '../../utils/apiResponse';
import type { JwtPayload } from '../../middlewares/auth.middleware';

export class AvailabilityController {
  /**
   * Ownership check: BARBER can only modify their own availability.
   * ADMIN can modify any barber's schedule.
   */
  private ensureOwnership(req: Request, barberId: string) {
    const user = (req as any).user as JwtPayload;
    if (user.role === 'BARBER' && user.id !== barberId) {
      throw Object.assign(
        new Error('Você só pode alterar sua própria disponibilidade'),
        { statusCode: 403 },
      );
    }
  }

  async getSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const schedule = await availabilityService.getSchedule(req.params.barberId as string);
      return sendSuccess(res, schedule);
    } catch (error) {
      next(error);
    }
  }

  async setSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      this.ensureOwnership(req, req.params.barberId as string);
      const schedule = await availabilityService.setSchedule(req.params.barberId as string, req.body);
      return sendSuccess(res, schedule, 'Disponibilidade atualizada');
    } catch (error) {
      next(error);
    }
  }

  async getSlots(req: Request, res: Response, next: NextFunction) {
    try {
      const slots = await availabilityService.getAvailableSlots(
        req.params.barberId as string,
        req.query.date as string,
      );
      return sendSuccess(res, slots);
    } catch (error) {
      next(error);
    }
  }

  async getExceptions(req: Request, res: Response, next: NextFunction) {
    try {
      this.ensureOwnership(req, req.params.barberId as string);
      const exceptions = await availabilityService.getExceptions(req.params.barberId as string);
      return sendSuccess(res, exceptions);
    } catch (error) {
      next(error);
    }
  }

  async createException(req: Request, res: Response, next: NextFunction) {
    try {
      this.ensureOwnership(req, req.params.barberId as string);
      const exception = await availabilityService.createException(req.params.barberId as string, req.body);
      return sendCreated(res, exception, 'Exceção criada');
    } catch (error) {
      next(error);
    }
  }

  async deleteException(req: Request, res: Response, next: NextFunction) {
    try {
      await availabilityService.deleteException(req.params.id as string);
      return sendSuccess(res, null, 'Exceção removida');
    } catch (error) {
      next(error);
    }
  }
}

export const availabilityController = new AvailabilityController();
