// =============================================
// Barbearia Vikings — Auth Service
// =============================================

import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { env } from '../../config/env';
import type { JwtPayload } from '../../middlewares/auth.middleware';

export class AuthService {
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.active) {
      throw Object.assign(new Error('Credenciais inválidas'), { statusCode: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw Object.assign(new Error('Credenciais inválidas'), { statusCode: 401 });
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const signOptions: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
    const refreshOptions: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any };

    const accessToken = jwt.sign(payload, env.JWT_SECRET, signOptions);
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, refreshOptions);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as JwtPayload;

      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user || !user.active) {
        throw Object.assign(new Error('Usuário não encontrado'), { statusCode: 401 });
      }

      const payload: JwtPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      const opts: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as any };
      const accessToken = jwt.sign(payload, env.JWT_SECRET, opts);

      return { accessToken };
    } catch {
      throw Object.assign(new Error('Refresh token inválido'), { statusCode: 401 });
    }
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw Object.assign(new Error('Usuário não encontrado'), { statusCode: 404 });
    }

    return user;
  }
}

export const authService = new AuthService();
