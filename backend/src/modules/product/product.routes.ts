// =============================================
// Barbearia Vikings — Product Routes
// =============================================

import { Router } from 'express';
import { productController } from './product.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createProductSchema, updateProductSchema, stockMovementSchema } from './product.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Public — landing page catalog
router.get('/public', productController.findAllPublic);

// All remaining product routes require admin auth
router.get('/', authenticate, requireRole(UserRole.ADMIN), productController.findAll);
router.get('/low-stock', authenticate, requireRole(UserRole.ADMIN), productController.getLowStock);
router.get('/:id', authenticate, requireRole(UserRole.ADMIN), productController.findById);
router.post('/', authenticate, requireRole(UserRole.ADMIN), validateRequest(createProductSchema), productController.create);
router.put('/:id', authenticate, requireRole(UserRole.ADMIN), validateRequest(updateProductSchema), productController.update);
router.delete('/:id', authenticate, requireRole(UserRole.ADMIN), productController.delete);
router.post('/:id/stock', authenticate, requireRole(UserRole.ADMIN), validateRequest(stockMovementSchema), productController.addStockMovement);
router.get('/:id/stock', authenticate, requireRole(UserRole.ADMIN), productController.getStockHistory);

export { router as productRoutes };
