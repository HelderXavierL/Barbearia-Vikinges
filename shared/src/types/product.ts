// =============================================
// Barbearia Vikings — Shared Types: Product
// =============================================

import { StockMovementType } from '../constants/roles';

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  stockMin: number;
  imageUrl?: string;
  active: boolean;
  createdAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stockQuantity?: number;
  stockMin?: number;
  imageUrl?: string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  stockMin?: number;
  imageUrl?: string;
  active?: boolean;
}

export interface StockMovementDTO {
  id: string;
  productId: string;
  productName: string;
  userId: string;
  userName: string;
  type: StockMovementType;
  quantity: number;
  reason?: string;
  createdAt: string;
}

export interface CreateStockMovementRequest {
  type: StockMovementType;
  quantity: number;
  reason?: string;
}
