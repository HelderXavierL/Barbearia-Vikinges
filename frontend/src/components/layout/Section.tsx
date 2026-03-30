// =============================================
// Barbearia Vikings — Section Component
// =============================================

import clsx from 'clsx';
import { useInView } from '../../hooks/useInView';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'dark' | 'panel' | 'transparent';
  animate?: boolean;
}

export function Section({ id, children, className, variant = 'dark', animate = true }: SectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id={id}
      ref={ref}
      className={clsx(
        'relative py-20 md:py-28 overflow-hidden',
        variant === 'dark' && 'bg-dark section-rune-bg',
        variant === 'panel' && 'bg-panel section-rune-bg',
        variant === 'transparent' && 'bg-transparent',
        animate && 'transition-all duration-700',
        animate && (isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'),
        className,
      )}
    >
      {children}
    </section>
  );
}
