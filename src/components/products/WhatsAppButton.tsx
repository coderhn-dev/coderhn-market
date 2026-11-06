import { MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import { ButtonAnchor } from '@/components/ui/Button';
import { productWhatsAppLink } from '@/utils/whatsapp';

interface Props {
  product: Pick<Product, 'name' | 'whatsapp'>;
  size?: 'sm' | 'md' | 'lg';
  block?: boolean;
  /** Etiqueta corta para tarjetas estrechas (la accesible sigue siendo completa). */
  compact?: boolean;
}

export function WhatsAppButton({ product, size = 'md', block, compact }: Props) {
  return (
    <ButtonAnchor
      href={productWhatsAppLink(product)}
      target="_blank"
      rel="noopener noreferrer"
      variant="whatsapp"
      size={size}
      block={block}
      icon={<MessageCircle className="size-5" />}
      onClick={(e) => e.stopPropagation()}
      aria-label={`Consultar por WhatsApp: ${product.name}`}
      className="whitespace-nowrap"
    >
      {compact ? 'Consultar' : 'Consultar por WhatsApp'}
    </ButtonAnchor>
  );
}
