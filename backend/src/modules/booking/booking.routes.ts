// =============================================
// Barbearia Vikings — Booking Routes
// =============================================

import { Router } from 'express';
import { bookingController } from './booking.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateRequest, validateQuery } from '../../middlewares/validateRequest';
import { createBookingSchema, updateBookingStatusSchema, bookingFiltersSchema } from './booking.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Public — clients book appointments without login
router.post('/', validateRequest(createBookingSchema), bookingController.create);

// Authenticated — admin/barber views
router.get('/', authenticate, validateQuery(bookingFiltersSchema), bookingController.findAll);
router.get('/barber/:barberId', authenticate, requireRole(UserRole.ADMIN, UserRole.BARBER), bookingController.getBarberDayAgenda);
router.get('/:id', authenticate, bookingController.findById);
router.patch('/:id/status', authenticate, validateRequest(updateBookingStatusSchema), bookingController.updateStatus);

export { router as bookingRoutes };
