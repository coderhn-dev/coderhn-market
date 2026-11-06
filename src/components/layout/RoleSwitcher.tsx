import { UserCircle2 } from 'lucide-react';
import type { Role } from '@/types';
import { ROLE_LABELS, useSession } from '@/store/session.store';

/** Cambio de rol simulado (solo demo, se reemplazará por autenticación real). */
export function RoleSwitcher({ compact }: { compact?: boolean }) {
  const { role, setRole } = useSession();
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">Rol de demostración</span>
      <UserCircle2 className="pointer-events-none absolute left-2.5 size-5 text-brand-700" />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
        className={`h-10 appearance-none rounded-full bg-brand-50 pr-3 pl-9 text-sm font-medium text-brand-900 ring-1 ring-brand-200 focus:ring-2 focus:ring-brand-600 focus:outline-none ${compact ? 'max-w-36' : ''}`}
      >
        {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
          <option key={r} value={r}>
            {ROLE_LABELS[r]}
          </option>
        ))}
      </select>
    </label>
  );
}
