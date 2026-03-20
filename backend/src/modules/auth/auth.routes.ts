// =============================================
// Barbearia Vikings — Auth Routes
// =============================================

import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { validateRequest } from '../../middlewares/validateRequest';
import { authLimiter } from '../../middlewares/rateLimiter';
import { loginSchema, refreshTokenSchema } from './auth.schema';

const router = Router();

router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refresh);
router.get('/me', authenticate, authController.me);

export { router as authRoutes };
