import { Building2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Territory } from '@/types';
import { getCountry, getValueChain } from '@/mocks/catalog';

export function TerritoryCard({ territory }: { territory: Territory }) {
  const country = getCountry(territory.country);
  return (
    <article className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-stone-200 md:p-5">
      <div className="flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {country.flag}
        </span>
        <div>
          <h3 className="font-semibold text-stone-900">{territory.name}</h3>
          <p className="text-sm text-stone-500">
            {territory.department}, {country.name}
          </p>
        </div>
      </div>
      <p className="text-sm text-stone-600">{territory.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {territory.valueChains.map((v) => {
          const c = getValueChain(v);
          return (
            <Link key={v} to={`/mercado?categoria=${v}&pais=${territory.country}`} className={`rounded-full px-2.5 py-1 text-xs font-medium ${c.tone}`}>
              {c.emoji} {c.name}
            </Link>
          );
        })}
      </div>
      <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-stone-100 pt-3 text-sm">
        <div className="flex items-center gap-2">
          <Home className="size-4 text-brand-700" />
          <dt className="sr-only">Familias</dt>
          <dd><strong>{territory.families.toLocaleString('es')}</strong> familias</dd>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-brand-700" />
          <dt className="sr-only">Organizaciones</dt>
          <dd><strong>{territory.organizations}</strong> organizaciones</dd>
        </div>
      </dl>
    </article>
  );
}
