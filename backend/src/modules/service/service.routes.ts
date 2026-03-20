// =============================================
// Barbearia Vikings — Service Routes
// =============================================

import { Router } from 'express';
import { serviceController } from './service.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createServiceSchema, updateServiceSchema } from './service.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Public
router.get('/', serviceController.findAll);
router.get('/:id', serviceController.findById);

// Admin only
router.post('/', authenticate, requireRole(UserRole.ADMIN), validateRequest(createServiceSchema), serviceController.create);
router.put('/:id', authenticate, requireRole(UserRole.ADMIN), validateRequest(updateServiceSchema), serviceController.update);
router.delete('/:id', authenticate, requireRole(UserRole.ADMIN), serviceController.delete);

export { router as serviceRoutes };
