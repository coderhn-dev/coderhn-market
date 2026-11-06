import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Product } from '@/types';
import { getCountry } from '@/mocks/catalog';
import { formatPrice, formatUnit } from '@/utils/format';
import { ProductImage } from './ProductImage';
import { WhatsAppButton } from './WhatsAppButton';

export function ProductCard({ product }: { product: Product }) {
  const country = getCountry(product.country);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 transition-shadow hover:shadow-md">
      <Link to={`/mercado/${product.id}`} className="block">
        <ProductImage src={product.image} alt={product.name} category={product.category} className="aspect-[4/3] w-full" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 md:p-4">
        <Link to={`/mercado/${product.id}`} className="line-clamp-2 font-semibold text-stone-900 group-hover:text-brand-800">
          {product.name}
        </Link>
        <p className="text-lg font-bold text-brand-800">
          {formatPrice(product.price, product.currency)}
          <span className="ml-1 text-sm font-medium text-stone-500">/ {formatUnit(product.unit)}</span>
        </p>
        <p className="line-clamp-1 text-sm text-stone-600">{product.producerName}</p>
        <p className="flex items-center gap-1 text-xs text-stone-500">
          <MapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1">
            {product.location} · {country.flag} {country.name}
          </span>
        </p>
        <div className="mt-auto pt-2">
          <WhatsAppButton product={product} size="sm" block compact />
        </div>
      </div>
    </article>
  );
}
