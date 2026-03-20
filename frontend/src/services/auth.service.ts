// =============================================
// Barbearia Vikings — Auth Service (API prep)
// =============================================

import { api } from '../config/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
  };
}

export const authService = {
  async login(data: LoginPayload): Promise<LoginResponse> {
    const res = await api.post('/auth/login', data);
    return res.data.data;
  },

  async refresh(): Promise<{ accessToken: string }> {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await api.post('/auth/refresh', { refreshToken });
    return res.data.data;
  },

  async getMe() {
    const res = await api.get('/auth/me');
    return res.data.data;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },
};
