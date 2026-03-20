// =============================================
// Barbearia Vikings — Barber Service (API prep)
// =============================================

import { api } from '../config/api';

export const barberService = {
  async getAll(serviceId?: string) {
    const params = serviceId ? { serviceId } : {};
    const res = await api.get('/barbers', { params });
    return res.data.data;
  },

  async getById(id: string) {
    const res = await api.get(`/barbers/${id}`);
    return res.data.data;
  },
};
