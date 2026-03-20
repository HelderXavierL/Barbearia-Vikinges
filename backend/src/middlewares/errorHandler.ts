// =============================================
// Barbearia Vikings — Error Handler Middleware
// =============================================

import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(`[ERROR] ${err.message}`, err.stack);

  // Zod validation errors
  if (err instanceof ZodError) {
    const formatted: Record<string, string[]> = {};
    err.errors.forEach((e) => {
      const path = e.path.join('.');
      if (!formatted[path]) formatted[path] = [];
      formatted[path].push(e.message);
    });

    return res.status(422).json({
      success: false,
      message: 'Erro de validação',
      errors: formatted,
    });
  }

  // Prisma known errors
  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(409).json({
      success: false,
      message: 'Conflito de dados — registro já existe ou referência inválida',
    });
  }

  // Default
  const status = (err as any).statusCode || 500;
  return res.status(status).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Erro interno do servidor'
      : err.message,
  });
}
