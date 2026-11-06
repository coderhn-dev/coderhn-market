import type { ReactNode } from 'react';

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-stone-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** Rejilla adaptable: 1 col móvil → 2 tablet → 3 escritorio → 4 pantalla amplia. */
export function CardGrid({ children, dense }: { children: ReactNode; dense?: boolean }) {
  return (
    <div
      className={
        dense
          ? 'grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 2xl:grid-cols-5'
          : 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
      }
    >
      {children}
    </div>
  );
}
