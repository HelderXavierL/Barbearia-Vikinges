// =============================================
// Barbearia Vikings — Admin Placeholder Pages
// =============================================

import { Calendar, Scissors, Package } from 'lucide-react';

function PlaceholderPage({ icon: Icon, title, description }: { icon: typeof Calendar; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center animate-fade">
      <div className="w-16 h-16 rounded-xl bg-brand-500/5 flex items-center justify-center mb-5">
        <Icon className="w-8 h-8 text-brand-500/30" />
      </div>
      <h3 className="text-lg font-display font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-[#5A5650] max-w-sm font-body">{description}</p>
      <p className="mt-4 text-xs text-brand-400/50 font-body uppercase tracking-wider">
        Disponível após integração com API
      </p>
    </div>
  );
}

export function AgendaPage() {
  return (
    <PlaceholderPage
      icon={Calendar}
      title="Agenda"
      description="Visualize e gerencie todos os agendamentos do dia. Confirme, complete ou cancele atendimentos."
    />
  );
}

export function ServicesPage() {
  return (
    <PlaceholderPage
      icon={Scissors}
      title="Gerenciar Serviços"
      description="Adicione, edite ou desative serviços. Gerencie preços, duração e associações com barbeiros."
    />
  );
}

export function ProductsPage() {
  return (
    <PlaceholderPage
      icon={Package}
      title="Gerenciar Produtos"
      description="Controle o catálogo de produtos e movimentações de estoque. Entrada, saída e ajustes."
    />
  );
}
