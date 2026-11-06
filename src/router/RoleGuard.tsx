import type { ReactNode } from 'react';
import { ShieldAlert } from 'lucide-react';
import type { Role } from '@/types';
import { useSession, ROLE_LABELS } from '@/store/session.store';

export function RoleGuard({ allow, children }: { allow: Role[]; children: ReactNode }) {
  const role = useSession((s) => s.role);
  if (allow.includes(role)) return <>{children}</>;
  return (
    <div className="mx-auto max-w-md space-y-3 rounded-3xl bg-white p-6 text-center ring-1 ring-stone-200">
      <ShieldAlert className="mx-auto size-12 text-amber-600" />
      <h1 className="text-xl font-bold">Acceso restringido</h1>
      <p className="text-stone-600">
        Esta sección es para: {allow.map((r) => ROLE_LABELS[r]).join(', ')}. Cambia tu rol en la parte superior para continuar (demo).
      </p>
    </div>
  );
}
