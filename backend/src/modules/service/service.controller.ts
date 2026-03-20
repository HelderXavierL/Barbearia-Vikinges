// =============================================
// Barbearia Vikings — Service Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { serviceService } from './service.service';
import { sendSuccess, sendCreated } from '../../utils/apiResponse';

export class ServiceController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const activeOnly = req.query.active !== 'false';
      const services = await serviceService.findAll(activeOnly);
      return sendSuccess(res, services);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.findById(req.params.id as string);
      return sendSuccess(res, service);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.create(req.body);
      return sendCreated(res, service, 'Serviço criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const service = await serviceService.update(req.params.id as string, req.body);
      return sendSuccess(res, service, 'Serviço atualizado');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await serviceService.softDelete(req.params.id as string);
      return sendSuccess(res, null, 'Serviço desativado');
    } catch (error) {
      next(error);
    }
  }
}

export const serviceController = new ServiceController();
