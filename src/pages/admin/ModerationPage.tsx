import { useState } from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import type { ModerationStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { ModerationBadge } from '@/components/ui/Badge';
import { Chip, ChipRow } from '@/components/ui/Chip';
import { EmptyState, GridSkeleton } from '@/components/ui/Feedback';
import { ProductImage } from '@/components/products/ProductImage';
import { useAsync } from '@/hooks/useAsync';
import { productsService } from '@/services';
import { getCountry, getValueChain } from '@/mocks/catalog';
import { formatDate, formatPrice, formatUnit } from '@/utils/format';
import { buildWhatsAppLink } from '@/utils/whatsapp';

const TABS: { id: ModerationStatus; label: string }[] = [
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'aprobado', label: 'Aprobados' },
  { id: 'rechazado', label: 'Rechazados' },
];

export default function ModerationPage() {
  const [status, setStatus] = useState<ModerationStatus>('pendiente');
  const { data, loading, setData } = useAsync(() => productsService.list({ status }), [status]);
  const [busy, setBusy] = useState<string>();

  const act = async (id: string, next: ModerationStatus) => {
    setBusy(id);
    try {
      await productsService.updateStatus(id, next);
      setData((list) => list?.filter((p) => p.id !== id));
    } finally {
      setBusy(undefined);
    }
  };

  return (
    <>
      <div className="mb-4">
        <ChipRow label="Estado">
          {TABS.map((t) => (
            <Chip key={t.id} active={status === t.id} onClick={() => setStatus(t.id)}>{t.label}</Chip>
          ))}
        </ChipRow>
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        {loading ? (
          <GridSkeleton count={3} className="h-32" />
        ) : !data?.length ? (
          <EmptyState title="No hay publicaciones en esta lista" />
        ) : (
          data.map((p) => (
            <article key={p.id} className="flex flex-col gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200 sm:flex-row">
              <ProductImage src={p.image} alt={p.name} category={p.category} className="aspect-video w-full shrink-0 rounded-xl sm:aspect-square sm:w-28" />
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <ModerationBadge status={p.moderationStatus} />
                  <span className="text-xs text-stone-400">{formatDate(p.createdAt)}</span>
                </div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-stone-600">
                  {getValueChain(p.category).emoji} {getValueChain(p.category).name} · {formatPrice(p.price, p.currency)} / {formatUnit(p.unit)}
                </p>
                <p className="text-sm text-stone-500">
                  {p.producerName} · {p.location}, {getCountry(p.country).flag}
                </p>
              </div>
              <div className="flex gap-2 sm:flex-col sm:justify-center">
                {p.moderationStatus !== 'aprobado' && (
                  <Button className="flex-1" disabled={busy === p.id} onClick={() => act(p.id, 'aprobado')} icon={<Check className="size-4" />}>Aprobar</Button>
                )}
                {p.moderationStatus !== 'rechazado' && (
                  <Button className="flex-1" variant="secondary" disabled={busy === p.id} onClick={() => act(p.id, 'rechazado')} icon={<X className="size-4" />}>Rechazar</Button>
                )}
                <a
                  href={buildWhatsAppLink(p.whatsapp, `Hola ${p.producerName}, soy promotor de CoderHN Market. Te escribo sobre tu publicación "${p.name}".`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 shrink-0 place-items-center rounded-xl ring-1 ring-stone-300 hover:bg-stone-50 sm:w-full"
                  aria-label="Contactar productor"
                >
                  <MessageCircle className="size-5 text-[#128C7E]" />
                </a>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
