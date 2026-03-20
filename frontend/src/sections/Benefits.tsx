// =============================================
// Barbearia Vikings — Benefits Section
// =============================================

import { Shield, Clock, Smartphone, Award, Users, Zap } from 'lucide-react';
import { Section } from '../components/layout/Section';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/common/SectionTitle';

const benefits = [
  {
    icon: Smartphone,
    title: 'Agendamento Online',
    description: 'Reserve seu horário em poucos cliques, sem ligações ou filas de espera.',
  },
  {
    icon: Clock,
    title: 'Pontualidade Viking',
    description: 'Cada atendimento tem horário marcado. Sem atrasos, sem surpresas.',
  },
  {
    icon: Shield,
    title: 'Qualidade Garantida',
    description: 'Produtos premium e técnicas atualizadas para um resultado impecável.',
  },
  {
    icon: Award,
    title: 'Programa de Fidelidade',
    description: 'Clientes recorrentes ganham benefícios exclusivos automaticamente.',
  },
  {
    icon: Users,
    title: 'Equipe Especializada',
    description: 'Cada barbeiro é especialista em diferentes estilos e técnicas.',
  },
  {
    icon: Zap,
    title: 'Confirmação Instantânea',
    description: 'Receba confirmação imediata do seu agendamento por WhatsApp.',
  },
];

export function Benefits() {
  return (
    <Section id="benefits" variant="panel">
      <Container>
        <SectionTitle
          title="Por Que Vikings"
          subtitle="Não somos apenas uma barbearia. Somos uma experiência construída sobre tradição e excelência."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="group p-6 md:p-8 rounded-xl bg-dark/50 border border-white/5 hover:border-brand-500/10 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-500/5 flex items-center justify-center mb-5 group-hover:bg-brand-500/10 transition-colors duration-500">
                  <Icon className="w-5 h-5 text-brand-500/70 group-hover:text-brand-400 transition-colors duration-500" />
                </div>
                <h3 className="text-base font-display font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[#5A5650] leading-relaxed font-body">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
