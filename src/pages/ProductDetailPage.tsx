import { useState } from 'react';
import { ArrowLeft, MapPin, QrCode, Store } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ModerationBadge } from '@/components/ui/Badge';
import { EmptyState, Skeleton } from '@/components/ui/Feedback';
import { ProductImage } from '@/components/products/ProductImage';
import { WhatsAppButton } from '@/components/products/WhatsAppButton';
import { QrFichaModal } from '@/components/qr/QrFicha';
import { useAsync } from '@/hooks/useAsync';
import { productsService } from '@/services';
import { getCountry, getUnit, getValueChain } from '@/mocks/catalog';
import { formatDate, formatPrice } from '@/utils/format';

export default function ProductDetailPage() {
  const { id = '' } = useParams();
  const { data: product, loading } = useAsync(() => productsService.getById(id), [id]);
  const [qrOpen, setQrOpen] = useState(false);

  if (loading) return <Skeleton className="h-[70dvh]" />;
  if (!product) return <EmptyState title="Producto no encontrado" />;

  const country = getCountry(product.country);
  const chain = getValueChain(product.category);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      <Link to="/mercado" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
        <ArrowLeft className="size-4" /> Mercado
      </Link>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
        <ProductImage src={product.image} alt={product.name} category={product.category} className="aspect-square w-full rounded-3xl md:sticky md:top-24" />

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${chain.tone}`}>
                {chain.emoji} {chain.name}
              </span>
              {product.moderationStatus !== 'aprobado' && <ModerationBadge status={product.moderationStatus} />}
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">{product.name}</h1>
            <p className="text-3xl font-bold text-brand-800">
              {formatPrice(product.price, product.currency)}
              <span className="ml-2 text-base font-medium text-stone-500">por {getUnit(product.unit).label.toLowerCase()}</span>
            </p>
            <p className="text-xs text-stone-500">Precio indicativo. Confirma con el productor.</p>
          </div>

          {product.description && <p className="text-stone-700">{product.description}</p>}

          <div className="space-y-2 rounded-2xl bg-white p-4 ring-1 ring-stone-200">
            <p className="flex items-center gap-2 font-medium">
              <Store className="size-5 text-brand-700" />
              {product.actorId ? (
                <Link to={`/directorio/${product.actorId}`} className="text-brand-800 underline-offset-2 hover:underline">
                  {product.producerName}
                </Link>
              ) : (
                product.producerName
              )}
            </p>
            <p className="flex items-center gap-2 text-sm text-stone-600">
              <MapPin className="size-5 text-brand-700" />
              {product.location} · {country.flag} {country.name}
            </p>
            <p className="text-xs text-stone-400">Publicado el {formatDate(product.createdAt)}</p>
          </div>

          {/* En móvil la acción principal queda fija abajo, sobre la barra de navegación */}
          <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-20 flex gap-2 border-t border-stone-200 bg-white/95 p-3 backdrop-blur md:static md:z-auto md:border-0 md:bg-transparent md:p-0">
            <div className="flex-1">
              <WhatsAppButton product={product} size="lg" block />
            </div>
            <Button variant="secondary" size="lg" onClick={() => setQrOpen(true)} icon={<QrCode className="size-5" />} aria-label="Ver ficha QR">
              <span className="hidden sm:inline">Ficha QR</span>
            </Button>
          </div>
        </div>
      </div>

      <QrFichaModal product={product} open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
}
