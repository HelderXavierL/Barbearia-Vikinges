// =============================================
// Barbearia Vikings — Mock Data: Barbers
// =============================================

export interface BarberData {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  available: boolean;
}

export const barbers: BarberData[] = [
  {
    id: 'barber-1',
    name: 'Ragnar Lothbrok',
    role: 'Master Barber',
    specialties: ['Corte Clássico', 'Barba Viking', 'Pigmentação'],
    rating: 4.9,
    reviewsCount: 247,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    available: true,
  },
  {
    id: 'barber-2',
    name: 'Bjorn Ironside',
    role: 'Senior Barber',
    specialties: ['Degradê', 'Design de Barba', 'Sobrancelha'],
    rating: 4.8,
    reviewsCount: 189,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    available: true,
  },
  {
    id: 'barber-3',
    name: 'Ivar, o Desossado',
    role: 'Barber & Artist',
    specialties: ['Corte Moderno', 'Barba Esculpida', 'Desenhos'],
    rating: 4.7,
    reviewsCount: 156,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face',
    available: true,
  },
];
