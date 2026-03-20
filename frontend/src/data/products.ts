// =============================================
// Barbearia Vikings — Mock Data: Products
// =============================================

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export const products: ProductData[] = [
  {
    id: 'prod-pomada',
    name: 'Pomada Modeladora Viking',
    description: 'Efeito matte com fixação forte. Ideal para estilos modernos e clássicos.',
    price: 45,
    imageUrl: 'https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=400&h=400&fit=crop',
    category: 'Cabelo',
    inStock: true,
  },
  {
    id: 'prod-oleo',
    name: 'Óleo para Barba',
    description: 'Óleo hidratante com aroma amadeirado. Amacia e dá brilho natural.',
    price: 55,
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop',
    category: 'Barba',
    inStock: true,
  },
  {
    id: 'prod-shampoo',
    name: 'Shampoo 3 em 1',
    description: 'Cabelo, barba e corpo em um só produto. Praticidade Viking.',
    price: 35,
    imageUrl: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&h=400&fit=crop',
    category: 'Cabelo',
    inStock: true,
  },
];
