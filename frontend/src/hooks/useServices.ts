// =============================================
// Barbearia Vikings — useServices Hook
// =============================================

import { useQuery } from '@tanstack/react-query';
import { serviceService } from '../services/service.service';

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  active: boolean;
  sortOrder: number;
}

export function useServices() {
  return useQuery<ServiceData[]>({
    queryKey: ['services'],
    queryFn: () => serviceService.getAll(),
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}
