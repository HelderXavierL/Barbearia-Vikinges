// =============================================
// Barbearia Vikings — Express App Configuration
// =============================================

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middlewares/errorHandler';
import { apiLimiter } from './middlewares/rateLimiter';
import { prisma } from './config/database';
import { sendSuccess, sendError } from './utils/apiResponse';

// Module Routes
import { authRoutes } from './modules/auth/auth.routes';
import { serviceRoutes } from './modules/service/service.routes';
import { barberRoutes } from './modules/barber/barber.routes';
import { availabilityRoutes } from './modules/availability/availability.routes';
import { bookingRoutes } from './modules/booking/booking.routes';
import { clientRoutes } from './modules/client/client.routes';
import { productRoutes } from './modules/product/product.routes';
import { notificationRoutes } from './modules/notification/notification.routes';

const app = express();

// ===== Global Middlewares =====
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/api', apiLimiter);

// ===== Health Check =====
app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return sendSuccess(res, {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
    });
  } catch {
    return sendError(res, 'Database connection failed', 503);
  }
});

// ===== API Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/barbers', barberRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/notifications', notificationRoutes);

// ===== 404 Handler =====
app.use('/api/*', (_req, res) => {
  return sendError(res, 'Rota não encontrada', 404);
});

// ===== Error Handler (must be last) =====
app.use(errorHandler);

export { app };
