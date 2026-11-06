import { CheckCircle2, Clock, ShieldCheck, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Skeleton } from '@/components/ui/Feedback';
import { useAsync } from '@/hooks/useAsync';
import { dashboardService, USE_MOCKS } from '@/services';
import { resetMockDb } from '@/services/mockDb';
import { getCountry } from '@/mocks/catalog';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { data, loading } = useAsync(() => dashboardService.stats(), []);
  if (loading || !data) return <Skeleton className="h-96" />;

  const max = Math.max(1, ...data.byCountry.map((c) => c.products));
  const cards = [
    { label: 'Publicaciones pendientes', value: data.products.pendiente, icon: Clock, cls: 'text-amber-700 bg-amber-50', to: '/admin/moderacion' },
    { label: 'Productos aprobados', value: data.products.aprobado, icon: CheckCircle2, cls: 'text-brand-700 bg-brand-50' },
    { label: 'Publicaciones rechazadas', value: data.products.rechazado, icon: XCircle, cls: 'text-red-700 bg-red-50' },
    { label: 'Actores en revisión', value: data.actors['en-revision'], icon: ShieldCheck, cls: 'text-sky-700 bg-sky-50', to: '/admin/actores' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, cls, to }) => {
          const body = (
            <>
              <span className={`grid size-10 place-items-center rounded-xl ${cls}`}><Icon className="size-5" /></span>
              <span className="text-3xl font-bold tabular-nums">{value}</span>
              <span className="text-sm text-stone-600">{label}</span>
            </>
          );
          const cl = 'flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-stone-200';
          return to ? <Link key={label} to={to} className={`${cl} hover:shadow-md`}>{body}</Link> : <div key={label} className={cl}>{body}</div>;
        })}
      </div>

      <section className="rounded-2xl bg-white p-5 ring-1 ring-stone-200">
        <h2 className="mb-4 font-semibold">Productos aprobados por país</h2>
        <ul className="space-y-3">
          {data.byCountry.map(({ country, products }) => {
            const c = getCountry(country);
            return (
              <li key={country} className="grid grid-cols-[8rem_1fr_2rem] items-center gap-3 text-sm md:grid-cols-[12rem_1fr_2rem]">
                <span className="truncate">{c.flag} {c.name}</span>
                <span className="h-3 overflow-hidden rounded-full bg-stone-100">
                  <span className="block h-full rounded-full bg-brand-600" style={{ width: `${(products / max) * 100}%` }} />
                </span>
                <span className="text-right font-semibold tabular-nums">{products}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {USE_MOCKS && (
        <div className="flex flex-col gap-2 rounded-2xl bg-stone-100 p-4 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
          <p>Modo demostración: los datos se guardan localmente en este dispositivo.</p>
          <Button variant="secondary" size="sm" onClick={resetMockDb}>Restablecer datos demo</Button>
        </div>
      )}
    </div>
  );
}
