import type { Product } from '@/types';
import { DEMO_MODE } from '@/services/config';

export const onlyDigits = (s: string) => s.replace(/\D/g, '');

/**
 * En modo demo los números de los datos de ejemplo son ficticios: se abre
 * WhatsApp con el mensaje prellenado y el usuario elige el contacto.
 */
export function buildWhatsAppLink(phone: string, message: string) {
  const target = DEMO_MODE ? '' : onlyDigits(phone);
  return `https://wa.me/${target}?text=${encodeURIComponent(message)}`;
}

export function productWhatsAppLink(product: Pick<Product, 'name' | 'whatsapp'>) {
  return buildWhatsAppLink(product.whatsapp, `Hola, me interesa el producto ${product.name} visto en CoderHN Market`);
}
