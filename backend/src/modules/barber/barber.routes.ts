// =============================================
// Barbearia Vikings — Barber Routes
// =============================================

import { Router } from 'express';
import { barberController } from './barber.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { createBarberSchema, updateBarberSchema } from './barber.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Public
router.get('/', barberController.findAll);
router.get('/:id', barberController.findById);

// Admin only
router.post('/', authenticate, requireRole(UserRole.ADMIN), validateRequest(createBarberSchema), barberController.create);
router.put('/:id', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), validateRequest(updateBarberSchema), barberController.update);
router.delete('/:id', authenticate, requireRole(UserRole.ADMIN), barberController.delete);

export { router as barberRoutes };
