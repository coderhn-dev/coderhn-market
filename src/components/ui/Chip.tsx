import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ChipProps {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function Chip({ active, onClick, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-colors',
        active ? 'bg-brand-700 text-white' : 'bg-white text-stone-700 ring-1 ring-stone-200 hover:bg-stone-50',
      )}
    >
      {children}
    </button>
  );
}

/** Fila de chips: scroll horizontal en móvil, se envuelve en tablet+. */
export function ChipRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:flex-wrap md:px-0">
      {children}
    </div>
  );
}
