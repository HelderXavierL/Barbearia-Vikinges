// =============================================
// Barbearia Vikings — Contact Section
// =============================================

import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Section } from '../components/layout/Section';
import { Container } from '../components/layout/Container';
import { SectionTitle } from '../components/common/SectionTitle';
import { businessInfo } from '../data/navigation';

export function Contact() {
  return (
    <Section id="contact" variant="dark">
      <Container>
        <SectionTitle
          title="Encontre-nos"
          subtitle="Venha nos visitar ou entre em contato. Estamos prontos para recebê-lo."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map placeholder */}
          <div className="rounded-xl overflow-hidden border border-white/5 bg-panel h-80 lg:h-full min-h-[320px] flex items-center justify-center">
            <div className="text-center space-y-3">
              <MapPin className="w-10 h-10 text-brand-500/30 mx-auto" />
              <p className="text-sm text-[#5A5650] font-body">
                Mapa será carregado com integração Google Maps
              </p>
              <p className="text-xs text-[#5A5650]/50 font-body">
                {businessInfo.address}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-panel border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#5A5650] font-body">Endereço</span>
                </div>
                <p className="text-sm text-[#8A8680] font-body">{businessInfo.address}</p>
              </div>

              <div className="p-5 rounded-xl bg-panel border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-brand-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#5A5650] font-body">Telefone</span>
                </div>
                <p className="text-sm text-[#8A8680] font-body">{businessInfo.phone}</p>
              </div>

              <div className="p-5 rounded-xl bg-panel border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-brand-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#5A5650] font-body">E-mail</span>
                </div>
                <p className="text-sm text-[#8A8680] font-body">{businessInfo.email}</p>
              </div>

              <div className="p-5 rounded-xl bg-panel border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-brand-400" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[#5A5650] font-body">Horários</span>
                </div>
                <div className="text-sm font-body space-y-1">
                  <p className="text-[#8A8680]">Seg–Sex: <span className="text-white">{businessInfo.hours.weekdays}</span></p>
                  <p className="text-[#8A8680]">Sáb: <span className="text-white">{businessInfo.hours.saturday}</span></p>
                  <p className="text-[#5A5650]">Dom: {businessInfo.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${businessInfo.whatsapp}?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da Barbearia Vikings.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#1A3A2A] hover:bg-[#1F4532] text-[#25D366] border border-[#25D366]/20 hover:border-[#25D366]/40 rounded-xl transition-all duration-300 font-body font-semibold text-sm tracking-wider uppercase"
            >
              <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              Fale pelo WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
