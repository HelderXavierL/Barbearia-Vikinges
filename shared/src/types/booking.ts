// =============================================
// Barbearia Vikings — Shared Types: Booking
// =============================================

import { BookingStatus } from '../constants/roles';

export interface BookingDTO {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

export interface CreateBookingRequest {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  barberId: string;
  serviceId: string;
  startTime: string; // ISO 8601
}

export interface UpdateBookingStatusRequest {
  status: BookingStatus;
}

export interface BookingFilters {
  barberId?: string;
  date?: string;
  status?: BookingStatus;
  page?: number;
  pageSize?: number;
}
