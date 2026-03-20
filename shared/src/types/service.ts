// =============================================
// Barbearia Vikings — Shared Types: Service
// =============================================

export interface ServiceDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  active: boolean;
  imageUrl?: string;
  sortOrder: number;
}

export interface CreateServiceRequest {
  name: string;
  description: string;
  price: number;
  durationMinutes?: number;
  imageUrl?: string;
  sortOrder?: number;
}

export interface UpdateServiceRequest {
  name?: string;
  description?: string;
  price?: number;
  durationMinutes?: number;
  imageUrl?: string;
  sortOrder?: number;
  active?: boolean;
}
