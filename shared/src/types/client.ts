// =============================================
// Barbearia Vikings — Shared Types: Client
// =============================================

export interface ClientDTO {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalBookings: number;
  lastVisit?: string;
  isRecurring: boolean;
  createdAt: string;
}

export interface UpdateClientRequest {
  name?: string;
  phone?: string;
  email?: string;
}
