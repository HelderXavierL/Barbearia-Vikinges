// =============================================
// Barbearia Vikings — Mock Data: FAQ
// =============================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Como faço para agendar um horário?',
    answer: 'Basta clicar no botão "Agendar" no topo da página, escolher o serviço, barbeiro, data e horário. O processo leva menos de 1 minuto.',
  },
  {
    question: 'Qual a duração de cada atendimento?',
    answer: 'Cada atendimento tem duração padrão de 35 minutos. Combos como Corte + Barba podem durar até 60 minutos.',
  },
  {
    question: 'Posso cancelar meu agendamento?',
    answer: 'Sim, cancelamentos podem ser feitos até 2 horas antes do horário marcado, sem nenhum custo.',
  },
  {
    question: 'Preciso criar uma conta para agendar?',
    answer: 'Não! Você pode agendar informando apenas seu nome e telefone. Super rápido e sem complicação.',
  },
  {
    question: 'Vocês aceitam quais formas de pagamento?',
    answer: 'Aceitamos Pix, cartão de crédito/débito e dinheiro. O pagamento é feito no local, após o atendimento.',
  },
  {
    question: 'Qual o horário de funcionamento?',
    answer: 'De segunda a sábado, das 09:00 às 18:00. Domingos e feriados estamos fechados.',
  },
];
