// =============================================
// Barbearia Vikings — Barber Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { barberService } from './barber.service';
import { sendSuccess, sendCreated } from '../../utils/apiResponse';

export class BarberController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const barbers = await barberService.findAll(req.query.serviceId as string);
      return sendSuccess(res, barbers);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.findById(req.params.id as string);
      return sendSuccess(res, barber);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.create(req.body);
      return sendCreated(res, barber, 'Barbeiro cadastrado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const barber = await barberService.update(req.params.id as string, req.body);
      return sendSuccess(res, barber, 'Barbeiro atualizado');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await barberService.softDelete(req.params.id as string);
      return sendSuccess(res, null, 'Barbeiro desativado');
    } catch (error) {
      next(error);
    }
  }
}

export const barberController = new BarberController();
