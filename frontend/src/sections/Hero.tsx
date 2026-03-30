// =============================================
// Barbearia Vikings — Hero Section (Viking Identity)
// =============================================

import { Link } from 'react-router-dom';
import { Calendar, ChevronDown } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { useScrollTo } from '../hooks/useScrollTo';
import logo from '../assets/logo.png';
import heroBg from '../assets/hero.jpg';

export function Hero() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/80 via-[#0A0A0F]/90 to-[#0A0A0F]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,169,110,0.06)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute inset-0 texture-metal" />

      {/* Faint rune watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[200px] md:text-[300px] text-brand-500/[0.02] font-serif leading-none">ᛟ</span>
      </div>

      {/* Decorative rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-500/5 animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-brand-500/[0.02]" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade">
          {/* Logo with rune ring */}
          <div className="relative rune-ring">
            <div className="absolute inset-0 blur-3xl bg-brand-500/10 rounded-full scale-150" />
            <img
              src={logo}
              alt="Barbearia Vikings"
              className="relative w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
            />
          </div>

          {/* Rune tagline */}
          <div className="space-y-2">
            <p className="text-[10px] md:text-xs tracking-[0.6em] text-brand-500/40 font-serif select-none">
              ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ
            </p>
            <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-brand-400 font-body font-medium">
              Estilo • Tradição • Precisão
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-wider text-glow leading-[1.1]">
            BARBEARIA
            <br />
            <span className="text-brand-400">VIKINGS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#8A8680] max-w-lg leading-relaxed font-body">
            A experiência de barbearia premium com a força e tradição dos guerreiros nórdicos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              to="/agendar"
              className="group flex items-center gap-3 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-dark font-bold text-sm tracking-widest uppercase rounded-lg transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:scale-105 font-body"
            >
              <Calendar className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              Agendar Horário
            </Link>
            <button
              onClick={() => scrollTo('services')}
              className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium text-sm tracking-wider uppercase rounded-lg border border-white/10 hover:border-brand-500/20 transition-all duration-300 font-body"
            >
              Conheça Nossos Serviços
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 md:gap-12 pt-8 border-t border-white/5 mt-4">
            {[
              { value: '5k+', label: 'Cortes' },
              { value: '4.9', label: 'Avaliação' },
              { value: '3', label: 'Barbeiros' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-2xl md:text-3xl font-display font-bold text-brand-400 text-glow-brand">
                  {stat.value}
                </span>
                <span className="block text-xs text-[#5A5650] uppercase tracking-wider mt-1 font-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('services')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#5A5650] hover:text-brand-400 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
