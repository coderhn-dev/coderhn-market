import type { ValueChainId } from '@/types';
import { getValueChain } from '@/mocks/catalog';
import { cn } from '@/utils/cn';

/** Imagen con carga diferida; sin foto muestra un placeholder de 0 KB. */
export function ProductImage({ src, alt, category, className }: { src?: string; alt: string; category: ValueChainId; className?: string }) {
  const chain = getValueChain(category);
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={cn('object-cover', className)} />;
  }
  return (
    <div className={cn('grid place-items-center', chain.tone, className)} role="img" aria-label={alt}>
      <span className="text-5xl md:text-6xl" aria-hidden>
        {chain.emoji}
      </span>
    </div>
  );
}
