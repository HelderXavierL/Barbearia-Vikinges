// =============================================
// Barbearia Vikings — Product Controller
// =============================================

import { Request, Response, NextFunction } from 'express';
import { productService } from './product.service';
import { sendSuccess, sendCreated } from '../../utils/apiResponse';

export class ProductController {
  async findAllPublic(_req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.findAllPublic();
      return sendSuccess(res, products);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const activeOnly = req.query.active !== 'false';
      const products = await productService.findAll(activeOnly);
      return sendSuccess(res, products);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(req.params.id as string);
      return sendSuccess(res, product);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      return sendCreated(res, product, 'Produto criado com sucesso');
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(req.params.id as string, req.body);
      return sendSuccess(res, product, 'Produto atualizado');
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.softDelete(req.params.id as string);
      return sendSuccess(res, null, 'Produto desativado');
    } catch (error) {
      next(error);
    }
  }

  async addStockMovement(req: Request, res: Response, next: NextFunction) {
    try {
      const movement = await productService.addStockMovement(
        req.params.id as string,
        req.user!.id,
        req.body,
      );
      return sendCreated(res, movement, 'Movimentação registrada');
    } catch (error) {
      next(error);
    }
  }

  async getStockHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const history = await productService.getStockHistory(req.params.id as string);
      return sendSuccess(res, history);
    } catch (error) {
      next(error);
    }
  }

  async getLowStock(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getLowStock();
      return sendSuccess(res, products);
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
