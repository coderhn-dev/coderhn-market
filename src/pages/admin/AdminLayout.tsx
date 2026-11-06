import { NavLink, Outlet } from 'react-router-dom';
import { useSession, can } from '@/store/session.store';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/utils/cn';

export default function AdminLayout() {
  const role = useSession((s) => s.role);
  const tabs = [
    { to: '/admin', label: 'Resumen', end: true },
    { to: '/admin/moderacion', label: 'Moderación' },
    ...(can.validateActors(role) ? [{ to: '/admin/actores', label: 'Validar actores' }] : []),
  ];
  return (
    <>
      <PageHeader title="Panel de gestión" subtitle="Promotores digitales rurales y administración de contenidos." />
      <nav className="-mx-4 mb-6 flex gap-2 overflow-x-auto border-b border-stone-200 px-4 scrollbar-none md:mx-0 md:px-0">
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            className={({ isActive }) =>
              cn('-mb-px border-b-2 px-4 py-3 text-sm font-semibold whitespace-nowrap', isActive ? 'border-brand-700 text-brand-800' : 'border-transparent text-stone-500')
            }
          >
            {t.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
}
