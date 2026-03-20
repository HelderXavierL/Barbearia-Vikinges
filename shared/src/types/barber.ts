// =============================================
// Barbearia Vikings — Shared Types: Barber
// =============================================

import { UserRole } from '../constants/roles';

export interface BarberDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  active: boolean;
  services: BarberServiceDTO[];
  createdAt: string;
}

export interface BarberServiceDTO {
  id: string;
  serviceId: string;
  serviceName: string;
}

export interface CreateBarberRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: UserRole;
  avatarUrl?: string;
  serviceIds?: string[];
}

export interface UpdateBarberRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  active?: boolean;
  serviceIds?: string[];
}

export interface AvailabilitySlotDTO {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  active: boolean;
}

export interface AvailabilityExceptionDTO {
  id: string;
  date: string;
  isBlocked: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
}

export interface CreateAvailabilityRequest {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface CreateExceptionRequest {
  date: string;
  isBlocked: boolean;
  startTime?: string;
  endTime?: string;
  reason?: string;
}

/** Slot de horário disponível para agendamento */
export interface TimeSlot {
  time: string;       // "09:00"
  available: boolean;
}
