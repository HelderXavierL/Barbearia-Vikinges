// =============================================
// Barbearia Vikings — Client Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { clientService } from './client.service';
import { sendSuccess, sendPaginated } from '../../utils/apiResponse';

export class ClientController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await clientService.findAll(req.query as any);
      return sendPaginated(res, result.clients, result.total, result.page, result.pageSize);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.findById(req.params.id as string);
      return sendSuccess(res, client);
    } catch (error) {
      next(error);
    }
  }

  async findByPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.findByPhone(req.query.phone as string);
      return sendSuccess(res, client);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientService.update(req.params.id as string, req.body);
      return sendSuccess(res, client, 'Cliente atualizado');
    } catch (error) {
      next(error);
    }
  }
}

export const clientController = new ClientController();
