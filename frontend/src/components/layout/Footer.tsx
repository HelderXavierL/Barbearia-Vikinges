// =============================================
// Barbearia Vikings — Footer Component
// =============================================

import { Instagram, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { businessInfo, navLinks } from '../../data/navigation';
import logo from '../../assets/logo.png';

export function Footer() {
  return (
    <footer className="relative bg-[#08080D] border-t border-white/5">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Barbearia Vikings" className="h-12 w-12 object-contain" />
              <div>
                <span className="text-lg font-display font-bold text-white tracking-wider">VIKINGS</span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-brand-400 font-body">Barbearia</span>
              </div>
            </Link>
            <p className="text-sm text-[#5A5650] leading-relaxed font-body">
              Estilo, tradição e precisão. A experiência Viking que você merece.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com/barbearia.vikings"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-[#8A8680] hover:text-brand-400 hover:bg-white/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-[#8A8680] hover:text-brand-400 hover:bg-white/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white tracking-wider uppercase mb-5">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.isSection ? link.href : undefined}
                    className="text-sm text-[#5A5650] hover:text-brand-400 transition-colors font-body"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white tracking-wider uppercase mb-5">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                <span className="text-sm text-[#5A5650] font-body">{businessInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="text-sm text-[#5A5650] font-body">{businessInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <span className="text-sm text-[#5A5650] font-body">{businessInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-sm font-display font-semibold text-white tracking-wider uppercase mb-5">Horários</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <div className="font-body">
                  <span className="block text-sm text-[#8A8680]">Seg – Sex</span>
                  <span className="text-sm text-white">{businessInfo.hours.weekdays}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                <div className="font-body">
                  <span className="block text-sm text-[#8A8680]">Sábado</span>
                  <span className="text-sm text-white">{businessInfo.hours.saturday}</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-500/50 shrink-0" />
                <div className="font-body">
                  <span className="block text-sm text-[#5A5650]">Domingo</span>
                  <span className="text-sm text-[#5A5650]">{businessInfo.hours.sunday}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#5A5650] font-body">
            © {new Date().getFullYear()} Barbearia Vikings. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#5A5650]/50 font-body">
            Desenvolvido por HexaDev
          </p>
        </div>
      </Container>
    </footer>
  );
}
