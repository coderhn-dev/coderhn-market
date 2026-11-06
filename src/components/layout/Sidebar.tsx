import { NavLink } from 'react-router-dom';
import { Download } from 'lucide-react';
import { useSession } from '@/store/session.store';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { cn } from '@/utils/cn';
import { NAV_ITEMS } from './nav';
import { Logo } from './Logo';

/**
 * Navegación lateral para tablet y escritorio.
 * - md (tablet): riel compacto de iconos con etiqueta corta.
 * - lg+ (escritorio/fullscreen): barra lateral completa.
 */
export function Sidebar() {
  const role = useSession((s) => s.role);
  const { canInstall, install } = useInstallPrompt();
  const items = NAV_ITEMS.filter((i) => !i.visible || i.visible(role));

  return (
    <aside className="sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-stone-200 bg-white md:flex md:w-24 lg:w-64">
      <div className="flex h-16 items-center justify-center px-4 lg:justify-start">
        <span className="lg:hidden">
          <Logo withText={false} />
        </span>
        <span className="hidden lg:block">
          <Logo />
        </span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3 lg:px-3" aria-label="Principal">
        {items.map(({ to, label, short, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-[11px] font-medium transition-colors lg:flex-row lg:gap-3 lg:px-3 lg:text-sm',
                isActive ? 'bg-brand-50 text-brand-800' : 'text-stone-600 hover:bg-stone-50',
              )
            }
          >
            <Icon className="size-6 lg:size-5" />
            <span className="lg:hidden">{short}</span>
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
      {canInstall && (
        <button
          onClick={install}
          className="m-3 flex flex-col items-center gap-1 rounded-xl bg-brand-700 p-3 text-xs font-semibold text-white lg:flex-row lg:gap-2 lg:text-sm"
        >
          <Download className="size-5" />
          <span className="lg:hidden">Instalar</span>
          <span className="hidden lg:inline">Instalar aplicación</span>
        </button>
      )}
    </aside>
  );
}
