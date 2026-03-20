// =============================================
// Barbearia Vikings — Error State
// =============================================

import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = 'Erro ao carregar dados', onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade">
      <div className="w-14 h-14 rounded-xl bg-red-500/5 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-400/70" />
      </div>
      <p className="text-sm text-[#8A8680] font-body mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-brand-400 bg-brand-500/5 hover:bg-brand-500/10 border border-brand-500/15 rounded-lg transition-all font-body"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Tentar novamente
        </button>
      )}
    </div>
  );
}
