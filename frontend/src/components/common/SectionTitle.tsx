// =============================================
// Barbearia Vikings — SectionTitle (Viking Identity)
// =============================================

import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({ title, subtitle, align = 'center', className }: SectionTitleProps) {
  return (
    <div className={clsx('mb-14 md:mb-16', align === 'center' && 'text-center', className)}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-wide text-glow">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-[#8A8680] max-w-2xl mx-auto leading-relaxed font-body">
          {subtitle}
        </p>
      )}
      {/* Rune divider */}
      <div className="mt-6 rune-divider" style={{ maxWidth: align === 'center' ? '260px' : '200px', marginLeft: align === 'left' ? 0 : 'auto', marginRight: align === 'left' ? 'auto' : 'auto' }}>
        <span className="rune-divider__symbol">ᛟ</span>
      </div>
    </div>
  );
}
