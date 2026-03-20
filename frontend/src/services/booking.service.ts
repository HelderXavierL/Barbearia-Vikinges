// =============================================
// Barbearia Vikings — Booking Service (API prep)
// =============================================

import { api } from '../config/api';

export interface CreateBookingPayload {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  barberId: string;
  serviceId: string;
  startTime: string;
  notes?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const bookingService = {
  async create(data: CreateBookingPayload) {
    const res = await api.post('/bookings', data);
    return res.data.data;
  },

  async getAvailableSlots(barberId: string, date: string): Promise<TimeSlot[]> {
    const res = await api.get(`/availability/${barberId}/slots`, { params: { date } });
    return res.data.data;
  },

  async getMyBookings(page = 1, pageSize = 20) {
    const res = await api.get('/bookings', { params: { page, pageSize } });
    return res.data.data;
  },

  async cancelBooking(id: string) {
    const res = await api.patch(`/bookings/${id}/status`, { status: 'CANCELLED' });
    return res.data.data;
  },
};
