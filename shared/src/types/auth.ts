// =============================================
// Barbearia Vikings — Shared Types: Auth
// =============================================

import { UserRole } from '../constants/roles';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
