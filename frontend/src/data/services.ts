// =============================================
// Barbearia Vikings — Mock Data: Services
// =============================================

import { Scissors, Brush, Sparkles, Eye, Palette } from 'lucide-react';

export interface ServiceData {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  icon: string;
  popular?: boolean;
}

export const services: ServiceData[] = [
  {
    id: 'svc-corte',
    name: 'Corte de Cabelo',
    description: 'Corte masculino profissional com acabamento perfeito e técnicas modernas.',
    price: 45,
    durationMinutes: 35,
    icon: 'scissors',
    popular: true,
  },
  {
    id: 'svc-barba',
    name: 'Barba',
    description: 'Aparar e modelar barba com navalha e toalha quente para o máximo conforto.',
    price: 35,
    durationMinutes: 35,
    icon: 'brush',
  },
  {
    id: 'svc-corte-barba',
    name: 'Corte + Barba',
    description: 'Combo completo de corte de cabelo e barba. O tratamento Viking definitivo.',
    price: 70,
    durationMinutes: 60,
    icon: 'sparkles',
    popular: true,
  },
  {
    id: 'svc-sobrancelha',
    name: 'Design de Sobrancelha',
    description: 'Alinhamento e design personalizado para realçar sua expressão.',
    price: 20,
    durationMinutes: 35,
    icon: 'eye',
  },
  {
    id: 'svc-pigmentacao',
    name: 'Pigmentação Capilar',
    description: 'Pigmentação para cobertura de falhas e calvície com resultado natural.',
    price: 120,
    durationMinutes: 35,
    icon: 'palette',
  },
];

export function getServiceIcon(iconName: string) {
  const icons: Record<string, typeof Scissors> = {
    scissors: Scissors,
    brush: Brush,
    sparkles: Sparkles,
    eye: Eye,
    palette: Palette,
  };
  return icons[iconName] || Scissors;
}
