import type { Unit } from '@/types';
import { getUnit } from '@/mocks/catalog';

export function formatPrice(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('es-419', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export const formatUnit = (unit: Unit) => getUnit(unit).short;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' });
