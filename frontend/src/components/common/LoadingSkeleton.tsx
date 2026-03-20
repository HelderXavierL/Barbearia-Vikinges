// =============================================
// Barbearia Vikings — Loading Skeleton
// =============================================

import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-xl bg-white/[0.04]',
        className,
      )}
    />
  );
}

/** Card-shaped skeleton for grids (services, barbers, products) */
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-white/5 bg-panel overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-6 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

/** Service-card-shaped skeleton */
export function ServiceCardSkeleton() {
  return (
    <div className="p-6 md:p-8 rounded-xl bg-panel border border-white/5">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 mt-5 border-t border-white/5">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  );
}

/** Row of skeleton cards for grids */
export function GridSkeleton({ count = 3, variant = 'card' }: { count?: number; variant?: 'card' | 'service' }) {
  const Component = variant === 'service' ? ServiceCardSkeleton : CardSkeleton;
  return (
    <div className={clsx(
      'grid gap-6',
      count === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      count === 4 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      count === 5 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export { Skeleton };
