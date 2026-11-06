import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Camera, CheckCircle2, QrCode, Wand2 } from 'lucide-react';
import type { Product } from '@/types';
import { Button, ButtonLink } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { Skeleton } from '@/components/ui/Feedback';
import { QrFichaModal, fichaUrl } from '@/components/qr/QrFicha';
import { useAsync } from '@/hooks/useAsync';
import { productsService } from '@/services';

export default function InnovationPage() {
  const { data: products, loading } = useAsync(() => productsService.list(), []);
  const [selected, setSelected] = useState<Product>();
  const [open, setOpen] = useState(false);
  const current = selected ?? products?.[0];

  return (
    <>
      <PageHeader title="Innovación rural" subtitle="Las dos innovaciones del proyecto para acercar la agricultura familiar al mercado digital." />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Innovación 1: Ficha QR */}
        <section className="flex flex-col gap-5 rounded-3xl bg-white p-5 ring-1 ring-stone-200 md:p-8">
          <header className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-brand-100 text-brand-800"><QrCode className="size-6" /></span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-brand-700 uppercase">Innovación 1</p>
              <h2 className="text-xl font-bold">Ficha QR de producto</h2>
            </div>
          </header>
          <p className="text-stone-600">
            Cada producto obtiene un código QR para su etiqueta. El comprador lo escanea y ve origen, lote y contacto directo del productor.
          </p>
          {loading || !current ? (
            <Skeleton className="h-64" />
          ) : (
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
              <div className="rounded-2xl bg-white p-3 ring-1 ring-stone-200">
                <QRCodeSVG value={fichaUrl(current.id)} size={160} marginSize={1} />
              </div>
              <div className="w-full flex-1 space-y-3">
                <label className="block text-sm font-medium">
                  Producto
                  <select
                    value={current.id}
                    onChange={(e) => setSelected(products?.find((p) => p.id === e.target.value))}
                    className="mt-1 h-12 w-full rounded-xl bg-white px-3 ring-1 ring-stone-300 focus:ring-2 focus:ring-brand-600 focus:outline-none"
                  >
                    {products?.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.producerName}</option>
                    ))}
                  </select>
                </label>
                <Button block onClick={() => setOpen(true)} icon={<QrCode className="size-5" />}>
                  Abrir ficha QR
                </Button>
                <ButtonLink to={`/ficha/${current.id}`} variant="secondary" block>
                  Ver ficha pública
                </ButtonLink>
              </div>
            </div>
          )}
        </section>

        {/* Innovación 2: Asistente guiado */}
        <section className="flex flex-col gap-5 rounded-3xl bg-white p-5 ring-1 ring-stone-200 md:p-8">
          <header className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-earth-100 text-earth-700"><Wand2 className="size-6" /></span>
            <div>
              <p className="text-xs font-semibold tracking-wide text-earth-700 uppercase">Innovación 2</p>
              <h2 className="text-xl font-bold">Asistente guiado de publicación</h2>
            </div>
          </header>
          <p className="text-stone-600">
            Publicar un producto en 5 pasos simples, con botones grandes e íconos, pensado para personas con baja alfabetización digital.
          </p>
          <ol className="space-y-2">
            {['Foto', 'Nombre y categoría', 'Precio y unidad', 'Ubicación', 'WhatsApp'].map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-xl bg-stone-50 px-4 py-3">
                <span className="grid size-8 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
                <span className="font-medium">{s}</span>
                {i === 0 && <Camera className="ml-auto size-5 text-stone-400" />}
              </li>
            ))}
          </ol>
          <ul className="space-y-1 text-sm text-stone-600">
            <li className="flex gap-2"><CheckCircle2 className="size-4 text-brand-700" /> Guarda el avance aunque se pierda la señal</li>
            <li className="flex gap-2"><CheckCircle2 className="size-4 text-brand-700" /> Comprime la foto en el teléfono</li>
            <li className="flex gap-2"><CheckCircle2 className="size-4 text-brand-700" /> Revisión por promotores antes de publicarse</li>
          </ul>
          <ButtonLink to="/publicar" size="xl" className="mt-auto" icon={<Wand2 className="size-6" />}>
            Iniciar asistente
          </ButtonLink>
        </section>
      </div>

      {current && <QrFichaModal product={current} open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
