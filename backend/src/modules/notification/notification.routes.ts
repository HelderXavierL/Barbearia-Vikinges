// =============================================
// Barbearia Vikings — Notification Routes
// =============================================

import { Router } from 'express';
import { notificationController } from './notification.controller';
import { authenticate, requireRole } from '../../middlewares/auth.middleware';
import { validateQuery, validateRequest } from '../../middlewares/validateRequest';
import { notificationFiltersSchema, webhookSchema } from './notification.schema';
import { UserRole } from '@prisma/client';

const router = Router();

// Admin only
router.get('/', authenticate, requireRole(UserRole.ADMIN), validateQuery(notificationFiltersSchema), notificationController.findAll);
router.post('/process', authenticate, requireRole(UserRole.ADMIN), notificationController.processPending);

// Webhook — system access (future: validate signature)
router.post('/webhook', validateRequest(webhookSchema), notificationController.webhook);

export { router as notificationRoutes };
