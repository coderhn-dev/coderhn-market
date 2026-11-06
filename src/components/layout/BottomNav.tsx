import { NavLink } from 'react-router-dom';
import { Home, Menu, Plus, Store, Users } from 'lucide-react';
import { useUi } from '@/store/ui.store';
import { cn } from '@/utils/cn';

const item = ({ isActive }: { isActive: boolean }) =>
  cn('flex flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-medium', isActive ? 'text-brand-700' : 'text-stone-500');

/** Barra inferior solo en móvil (< md). Acciones al alcance del pulgar. */
export function BottomNav() {
  const setMenuOpen = useUi((s) => s.setMenuOpen);
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-stone-200 bg-white/95 pb-safe backdrop-blur md:hidden"
    >
      <div className="flex h-16 items-stretch">
        <NavLink to="/" end className={item}>
          <Home className="size-6" /> Inicio
        </NavLink>
        <NavLink to="/mercado" className={item}>
          <Store className="size-6" /> Mercado
        </NavLink>
        <NavLink to="/publicar" className="flex flex-1 items-center justify-center" aria-label="Publicar producto">
          <span className="-mt-6 grid size-14 place-items-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/30 ring-4 ring-canvas">
            <Plus className="size-7" />
          </span>
        </NavLink>
        <NavLink to="/directorio" className={item}>
          <Users className="size-6" /> Directorio
        </NavLink>
        <button onClick={() => setMenuOpen(true)} className={item({ isActive: false })}>
          <Menu className="size-6" /> Más
        </button>
      </div>
    </nav>
  );
}
