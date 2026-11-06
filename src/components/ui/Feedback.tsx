import type { ReactNode } from 'react';
import { AlertTriangle, Inbox } from 'lucide-react';
import { Button } from './Button';

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-stone-200/70 ${className}`} />;
}

export function GridSkeleton({ count = 6, className = 'h-64' }: { count?: number; className?: string }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={className} />
      ))}
    </>
  );
}

export function EmptyState({ title, children, icon }: { title: string; children?: ReactNode; icon?: ReactNode }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-stone-200">
      <div className="text-stone-400">{icon ?? <Inbox className="size-10" />}</div>
      <p className="font-semibold text-stone-800">{title}</p>
      {children && <div className="text-sm text-stone-500">{children}</div>}
    </div>
  );
}

export function ErrorState({ error, onRetry }: { error: Error; onRetry?: () => void }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-2xl bg-red-50 px-6 py-10 text-center ring-1 ring-red-200">
      <AlertTriangle className="size-8 text-red-600" />
      <p className="font-semibold text-red-800">No pudimos cargar la información</p>
      <p className="text-sm text-red-700">{error.message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
}
