// =============================================
// Barbearia Vikings — Navigation Config
// =============================================

export interface NavLink {
  label: string;
  href: string;
  isSection?: boolean;
}

export const navLinks: NavLink[] = [
  { label: 'Início', href: '#hero', isSection: true },
  { label: 'Serviços', href: '#services', isSection: true },
  { label: 'Barbeiros', href: '#barbers', isSection: true },
  { label: 'Produtos', href: '#products', isSection: true },
  { label: 'FAQ', href: '#faq', isSection: true },
  { label: 'Contato', href: '#contact', isSection: true },
];

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/barbearia.vikings', icon: 'instagram' },
  { label: 'WhatsApp', href: 'https://wa.me/5511999990000', icon: 'whatsapp' },
];

export const businessInfo = {
  name: 'Barbearia Vikings',
  address: 'Rua dos Nórdicos, 1200 — São Paulo, SP',
  phone: '(11) 99999-0000',
  email: 'contato@barbearia-vikings.com',
  hours: {
    weekdays: '09:00 – 18:00',
    saturday: '09:00 – 18:00',
    sunday: 'Fechado',
  },
  whatsapp: '5511999990000',
};
