// =============================================
// Barbearia Vikings — useProducts Hook
// =============================================

import { useQuery } from '@tanstack/react-query';
import { api } from '../config/api';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
}

export function useProducts() {
  return useQuery<ProductData[]>({
    queryKey: ['products-public'],
    queryFn: async () => {
      const res = await api.get('/products/public');
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
