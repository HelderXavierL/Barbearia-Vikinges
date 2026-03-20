// =============================================
// Barbearia Vikings — Booking Flow Step Indicator
// =============================================

import clsx from 'clsx';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-xl mx-auto mb-10">
      {steps.map((label, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 font-body',
                  isCompleted && 'bg-brand-500 text-dark',
                  isActive && 'bg-brand-500/20 text-brand-400 ring-2 ring-brand-500/30',
                  !isActive && !isCompleted && 'bg-white/5 text-[#5A5650]',
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={clsx(
                  'mt-2 text-[10px] uppercase tracking-wider font-body whitespace-nowrap',
                  isActive ? 'text-brand-400' : 'text-[#5A5650]',
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={clsx(
                  'flex-1 h-px mx-3 transition-all duration-500',
                  index < currentStep ? 'bg-brand-500/50' : 'bg-white/5',
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
