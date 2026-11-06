import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Download, X } from 'lucide-react';
import { useSession } from '@/store/session.store';
import { useUi } from '@/store/ui.store';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { NAV_ITEMS } from './nav';
import { RoleSwitcher } from './RoleSwitcher';

export function MobileMenu() {
  const { menuOpen, setMenuOpen } = useUi();
  const role = useSession((s) => s.role);
  const { canInstall, install } = useInstallPrompt();
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  if (!menuOpen) return null;
  const items = NAV_ITEMS.filter((i) => !i.visible || i.visible(role));

  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true" aria-label="Menú">
      <button className="absolute inset-0 bg-stone-950/50" onClick={() => setMenuOpen(false)} aria-label="Cerrar menú" />
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white p-5 pb-safe">
        <div className="mb-4 flex items-center justify-between">
          <RoleSwitcher />
          <button onClick={() => setMenuOpen(false)} className="grid size-10 place-items-center rounded-full hover:bg-stone-100" aria-label="Cerrar">
            <X className="size-5" />
          </button>
        </div>
        <nav className="grid grid-cols-3 gap-3 pb-4">
          {items.map(({ to, short, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-2 rounded-2xl p-4 text-xs font-medium ${isActive ? 'bg-brand-50 text-brand-800' : 'bg-stone-50 text-stone-700'}`
              }
            >
              <Icon className="size-7" />
              {short}
            </NavLink>
          ))}
        </nav>
        {canInstall && (
          <button onClick={install} className="mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-700 font-semibold text-white">
            <Download className="size-5" /> Instalar aplicación
          </button>
        )}
      </div>
    </div>
  );
}
