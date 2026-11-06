import { Link } from 'react-router-dom';
import { MapPin, Users } from 'lucide-react';
import type { Actor } from '@/types';
import { getCountry, getValueChain } from '@/mocks/catalog';
import { ValidationBadge } from '@/components/ui/Badge';
import { ACTOR_TYPE_LABELS } from './labels';

export function ActorCard({ actor }: { actor: Actor }) {
  const country = getCountry(actor.country);
  const initials = actor.name.split(' ').slice(0, 2).map((w) => w[0]).join('');
  return (
    <Link
      to={`/directorio/${actor.id}`}
      className="flex flex-col gap-3 rounded-2xl bg-white p-4 ring-1 ring-stone-200 transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-100 text-lg font-bold text-brand-800">{initials}</div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 font-semibold text-stone-900">{actor.name}</h3>
          <p className="text-xs font-medium text-earth-700">{ACTOR_TYPE_LABELS[actor.type]}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-stone-600">{actor.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {actor.valueChains.map((v) => {
          const c = getValueChain(v);
          return (
            <span key={v} className={`rounded-full px-2 py-0.5 text-xs ${c.tone}`}>
              {c.emoji} {c.name}
            </span>
          );
        })}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
        <span className="flex min-w-0 items-center gap-1">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{country.flag} {actor.location}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1">
          <Users className="size-3.5" /> {actor.members}
        </span>
      </div>
      <ValidationBadge status={actor.validationStatus} className="self-start" />
    </Link>
  );
}
