// =============================================
// Barbearia Vikings — useBarbers Hook
// =============================================

import { useQuery } from '@tanstack/react-query';
import { barberService } from '../services/barber.service';

export interface BarberData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string | null;
  active: boolean;
  services: { service: { id: string; name: string } }[];
}

export function useBarbers(serviceId?: string) {
  return useQuery<BarberData[]>({
    queryKey: ['barbers', serviceId],
    queryFn: () => barberService.getAll(serviceId),
    staleTime: 5 * 60 * 1000,
  });
}
