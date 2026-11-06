import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ValidationStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { ValidationBadge } from '@/components/ui/Badge';
import { Chip, ChipRow } from '@/components/ui/Chip';
import { EmptyState, GridSkeleton } from '@/components/ui/Feedback';
import { ACTOR_TYPE_LABELS } from '@/components/actors/labels';
import { useAsync } from '@/hooks/useAsync';
import { actorsService } from '@/services';
import { getCountry } from '@/mocks/catalog';

const TABS: { id: ValidationStatus; label: string }[] = [
  { id: 'en-revision', label: 'En revisión' },
  { id: 'validado', label: 'Validados' },
  { id: 'rechazado', label: 'Rechazados' },
];

export default function ActorValidationPage() {
  const [status, setStatus] = useState<ValidationStatus>('en-revision');
  const { data, loading, setData } = useAsync(() => actorsService.list({ status }), [status]);

  const act = async (id: string, next: ValidationStatus) => {
    await actorsService.updateValidation(id, next);
    setData((list) => list?.filter((a) => a.id !== id));
  };

  return (
    <>
      <div className="mb-4">
        <ChipRow label="Estado de validación">
          {TABS.map((t) => (
            <Chip key={t.id} active={status === t.id} onClick={() => setStatus(t.id)}>{t.label}</Chip>
          ))}
        </ChipRow>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200">
        {loading ? (
          <div className="space-y-2 p-4"><GridSkeleton count={3} className="h-16" /></div>
        ) : !data?.length ? (
          <EmptyState title="Sin actores en esta lista" />
        ) : (
          <ul className="divide-y divide-stone-100">
            {data.map((a) => (
              <li key={a.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
                <div className="min-w-0 flex-1">
                  <Link to={`/directorio/${a.id}`} className="font-semibold hover:underline">{a.name}</Link>
                  <p className="text-sm text-stone-500">
                    {ACTOR_TYPE_LABELS[a.type]} · {getCountry(a.country).flag} {a.location} · {a.members} miembros
                  </p>
                </div>
                <ValidationBadge status={a.validationStatus} className="self-start md:self-center" />
                <div className="flex gap-2">
                  {a.validationStatus !== 'validado' && (
                    <Button size="sm" onClick={() => act(a.id, 'validado')} icon={<Check className="size-4" />}>Validar</Button>
                  )}
                  {a.validationStatus !== 'rechazado' && (
                    <Button size="sm" variant="secondary" onClick={() => act(a.id, 'rechazado')} icon={<X className="size-4" />}>Rechazar</Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
