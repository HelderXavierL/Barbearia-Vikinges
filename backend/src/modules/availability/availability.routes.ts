// =============================================
// Barbearia Vikings — Availability Routes
// =============================================

import { Router } from 'express';
import { availabilityController } from './availability.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest, validateQuery } from '../../middlewares/validateRequest';
import { setAvailabilitySchema, createExceptionSchema, slotsQuerySchema } from './availability.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Public
router.get('/:barberId', availabilityController.getSchedule);
router.get('/:barberId/slots', validateQuery(slotsQuerySchema), availabilityController.getSlots);

// Authenticated (Admin or own barber)
router.put('/:barberId', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), validateRequest(setAvailabilitySchema), availabilityController.setSchedule);
router.get('/:barberId/exceptions', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), availabilityController.getExceptions);
router.post('/:barberId/exceptions', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), validateRequest(createExceptionSchema), availabilityController.createException);
router.delete('/exceptions/:id', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), availabilityController.deleteException);

export { router as availabilityRoutes };
