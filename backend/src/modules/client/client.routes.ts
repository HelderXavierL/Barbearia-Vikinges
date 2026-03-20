// =============================================
// Barbearia Vikings — Client Routes
// =============================================

import { Router } from 'express';
import { clientController } from './client.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest, validateQuery } from '../../middlewares/validateRequest';
import { updateClientSchema, clientFiltersSchema } from './client.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// All client routes require authentication
router.get('/', authenticate, validateQuery(clientFiltersSchema), clientController.findAll);
router.get('/search', authenticate, clientController.findByPhone);
router.get('/:id', authenticate, clientController.findById);
router.put('/:id', authenticate, requireRole(UserRole.ADMIN), validateRequest(updateClientSchema), clientController.update);

export { router as clientRoutes };
