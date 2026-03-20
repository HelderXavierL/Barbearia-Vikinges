// =============================================
// Barbearia Vikings — Shared Types: API
// =============================================

/** Resposta padronizada da API */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/** Resposta padronizada com paginação */
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/** Resposta de erro */
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
