// =============================================
// Barbearia Vikings — Booking Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { bookingService } from './booking.service';
import { sendSuccess, sendCreated, sendPaginated } from '../../utils/apiResponse';

export class BookingController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await bookingService.create(req.body);
      return sendCreated(res, booking, 'Agendamento confirmado!');
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bookingService.findAll(
        req.query as any,
        req.user?.id,
        req.user?.role,
      );
      return sendPaginated(res, result.bookings, result.total, result.page, result.pageSize);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await bookingService.findById(req.params.id as string);
      return sendSuccess(res, booking);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const booking = await bookingService.updateStatus(req.params.id as string, req.body);
      return sendSuccess(res, booking, 'Status atualizado');
    } catch (error) {
      next(error);
    }
  }

  async getBarberDayAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      const agenda = await bookingService.getBarberDayAgenda(
        req.params.barberId as string,
        req.query.date as string,
      );
      return sendSuccess(res, agenda);
    } catch (error) {
      next(error);
    }
  }
}

export const bookingController = new BookingController();
