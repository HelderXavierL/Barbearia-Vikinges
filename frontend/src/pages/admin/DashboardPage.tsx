// =============================================
// Barbearia Vikings — Admin Dashboard Page
// =============================================

import { Calendar, Users, Scissors, Package, TrendingUp, Clock } from 'lucide-react';

const stats = [
  { label: 'Agendamentos Hoje', value: '12', icon: Calendar, trend: '+3 vs ontem' },
  { label: 'Clientes Ativos', value: '247', icon: Users, trend: '+8 esta semana' },
  { label: 'Serviços Ativos', value: '5', icon: Scissors, trend: '' },
  { label: 'Produtos em Estoque', value: '65', icon: Package, trend: '3 com estoque baixo' },
];

const todayBookings = [
  { time: '09:00', client: 'João Silva', service: 'Corte de Cabelo', barber: 'Ragnar', status: 'confirmed' },
  { time: '09:35', client: 'Pedro Santos', service: 'Barba', barber: 'Bjorn', status: 'confirmed' },
  { time: '10:10', client: 'Lucas Oliveira', service: 'Corte + Barba', barber: 'Ragnar', status: 'pending' },
  { time: '11:20', client: 'Marcos Souza', service: 'Corte de Cabelo', barber: 'Ivar', status: 'confirmed' },
  { time: '14:00', client: 'André Costa', service: 'Pigmentação', barber: 'Ragnar', status: 'confirmed' },
];

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-5 rounded-xl bg-panel border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand-400" />
                </div>
                <span className="text-xs uppercase tracking-wider text-[#5A5650] font-body">{stat.label}</span>
              </div>
              <p className="text-3xl font-display font-bold text-white">{stat.value}</p>
              {stat.trend && (
                <p className="flex items-center gap-1 mt-2 text-xs text-[#5A5650] font-body">
                  <TrendingUp className="w-3 h-3 text-brand-400" />
                  {stat.trend}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Today's agenda */}
      <div className="rounded-xl bg-panel border border-white/5 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-sm font-display font-semibold text-white tracking-wider uppercase">
            Agenda de Hoje
          </h3>
          <span className="flex items-center gap-1.5 text-xs text-[#5A5650] font-body">
            <Clock className="w-3.5 h-3.5" />
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>

        <div className="divide-y divide-white/5">
          {todayBookings.map((booking, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
              <span className="text-sm font-mono text-brand-400 w-12 shrink-0 font-body">{booking.time}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white font-body truncate">{booking.client}</p>
                <p className="text-xs text-[#5A5650] font-body">{booking.service} • {booking.barber}</p>
              </div>
              <span
                className={`px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-full font-body ${
                  booking.status === 'confirmed'
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}
              >
                {booking.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
