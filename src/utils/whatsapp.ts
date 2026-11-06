import type { Product } from '@/types';

export const onlyDigits = (s: string) => s.replace(/\D/g, '');

export function buildWhatsAppLink(phone: string, message: string) {
  return `https://wa.me/${onlyDigits(phone)}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppLink(product: Pick<Product, 'name' | 'whatsapp'>) {
  return buildWhatsAppLink(
    product.whatsapp,
    `Hola, me interesa el producto ${product.name} visto en el Centro Virtual SICA`,
  );
}
