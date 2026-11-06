import { BadgeCheck, CalendarDays, Leaf, Mountain, Package } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { EmptyState, Skeleton } from '@/components/ui/Feedback';
import { ProductImage } from '@/components/products/ProductImage';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import { Logo } from '@/components/layout/Logo';
import { useAsync } from '@/hooks/useAsync';
import { productsService } from '@/services';
import { getCountry, getValueChain } from '@/mocks/catalog';
import { formatDate, formatPrice, formatUnit } from '@/utils/format';

/**
 * Ficha pública a la que apunta el código QR (etiqueta del producto).
 * Página ligera, sin navegación, pensada para abrirse desde la cámara del celular.
 */
export default function FichaPage() {
  const { id = '' } = useParams();
  const { data: p, loading } = useAsync(() => productsService.getById(id), [id]);

  return (
    <div className="mx-auto min-h-dvh max-w-xl bg-canvas px-4 py-5 pt-safe">
      <div className="mb-5 flex justify-center">
        <Logo />
      </div>
      {loading ? (
        <Skeleton className="h-[70dvh]" />
      ) : !p ? (
        <EmptyState title="Ficha no encontrada" />
      ) : (
        <article className="overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200">
          <ProductImage src={p.image} alt={p.name} category={p.category} className="aspect-video w-full" />
          <div className="space-y-4 p-5">
            <div>
              <p className="text-sm font-medium text-earth-700">
                {getValueChain(p.category).emoji} {getValueChain(p.category).name} · {getCountry(p.country).flag} {getCountry(p.country).name}
              </p>
              <h1 className="text-2xl font-bold">{p.name}</h1>
              <p className="text-stone-600">{p.producerName} — {p.location}</p>
              <p className="mt-1 text-xl font-bold text-brand-800">
                {formatPrice(p.price, p.currency)} / {formatUnit(p.unit)}
              </p>
            </div>

            {p.traceability ? (
              <section className="space-y-3 rounded-2xl bg-brand-50 p-4">
                <h2 className="flex items-center gap-2 font-semibold text-brand-900">
                  <BadgeCheck className="size-5" /> Trazabilidad
                </h2>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex gap-2"><Package className="size-4 text-brand-700" /><div><dt className="text-stone-500">Lote</dt><dd className="font-medium">{p.traceability.lot}</dd></div></div>
                  <div className="flex gap-2"><CalendarDays className="size-4 text-brand-700" /><div><dt className="text-stone-500">Cosecha</dt><dd className="font-medium">{formatDate(p.traceability.harvestDate)}</dd></div></div>
                  {p.traceability.altitudeMasl && (
                    <div className="flex gap-2"><Mountain className="size-4 text-brand-700" /><div><dt className="text-stone-500">Altitud</dt><dd className="font-medium">{p.traceability.altitudeMasl} msnm</dd></div></div>
                  )}
                  <div className="col-span-2 flex gap-2"><Leaf className="size-4 text-brand-700" /><div><dt className="text-stone-500">Prácticas</dt><dd className="font-medium">{p.traceability.practices.join(', ')}</dd></div></div>
                </dl>
                {p.traceability.certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {p.traceability.certifications.map((c) => (
                      <span key={c} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-200">{c}</span>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">El productor aún no ha registrado datos de trazabilidad.</p>
            )}

            <WhatsAppButton product={p} size="lg" block />
          </div>
        </article>
      )}
    </div>
  );
}
