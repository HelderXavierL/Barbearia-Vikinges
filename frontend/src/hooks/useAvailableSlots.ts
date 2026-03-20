// =============================================
// Barbearia Vikings — useAvailableSlots Hook
// =============================================

import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../services/booking.service';
import type { TimeSlot } from '../services/booking.service';

export function useAvailableSlots(barberId: string, date: string) {
  return useQuery<TimeSlot[]>({
    queryKey: ['slots', barberId, date],
    queryFn: () => bookingService.getAvailableSlots(barberId, date),
    enabled: !!barberId && !!date,
    staleTime: 30 * 1000, // 30s — slots change frequently
    refetchOnWindowFocus: true,
  });
}
