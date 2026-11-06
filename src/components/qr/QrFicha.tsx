import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Printer, Share2 } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatPrice, formatUnit } from '@/utils/format';

export const fichaUrl = (id: string) => `${window.location.origin}/ficha/${id}`;

/**
 * Innovación 1 – Ficha QR: QR dinámico que apunta a la ficha pública de
 * trazabilidad del producto. Se puede descargar, imprimir para etiquetas o compartir.
 */
export function QrFichaModal({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const url = fichaUrl(product.id);

  const download = () => {
    const canvas = wrap.current?.querySelector('canvas');
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `ficha-qr-${product.id}.png`;
    a.click();
  };

  const share = async () => {
    if (navigator.share) await navigator.share({ title: product.name, url }).catch(() => undefined);
    else await navigator.clipboard?.writeText(url);
  };

  return (
    <Modal open={open} onClose={onClose} title="Ficha QR del producto">
      <div className="flex flex-col items-center gap-4 text-center print:gap-2">
        <div ref={wrap} className="rounded-2xl bg-white p-4 ring-1 ring-stone-200">
          <QRCodeCanvas
            value={url}
            size={220}
            level="M"
            marginSize={2}
            imageSettings={{ src: '/icons/pwa-192.png', height: 40, width: 40, excavate: true }}
          />
        </div>
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm text-stone-500">
            {product.producerName} · {formatPrice(product.price, product.currency)} / {formatUnit(product.unit)}
          </p>
          <p className="mt-1 text-xs break-all text-stone-400">{url}</p>
        </div>
        <div className="grid w-full grid-cols-3 gap-2 print:hidden">
          <Button variant="secondary" onClick={download} icon={<Download className="size-4" />}>
            PNG
          </Button>
          <Button variant="secondary" onClick={() => window.print()} icon={<Printer className="size-4" />}>
            Imprimir
          </Button>
          <Button variant="secondary" onClick={share} icon={<Share2 className="size-4" />}>
            Compartir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
