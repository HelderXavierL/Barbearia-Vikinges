// =============================================
// Barbearia Vikings — Service Service (API prep)
// =============================================

import { api } from '../config/api';

export const serviceService = {
  async getAll() {
    const res = await api.get('/services');
    return res.data.data;
  },

  async getById(id: string) {
    const res = await api.get(`/services/${id}`);
    return res.data.data;
  },
};
