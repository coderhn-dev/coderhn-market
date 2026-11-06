import { ACTORS } from '@/mocks/actors';
import { PRODUCTS } from '@/mocks/products';
import type { Actor, Product } from '@/types';

/**
 * "Base de datos" en memoria para el modo mock. Persiste en localStorage
 * para que las acciones de moderación y publicación sobrevivan a recargas.
 */
interface Db {
  products: Product[];
  actors: Actor[];
}

const KEY = 'coderhn-mockdb-v1';

function load(): Db {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Db;
  } catch {
    /* ignorar */
  }
  return { products: structuredClone(PRODUCTS), actors: structuredClone(ACTORS) };
}

export const db: Db = load();

export function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch {
    /* cuota excedida o modo privado: seguimos en memoria */
  }
}

export function resetMockDb() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignorar */
  }
  location.reload();
}

/** Simula latencia de red y devuelve copias para evitar mutaciones desde la UI. */
export function delay<T>(data: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));
}

export const uid = (prefix: string) => `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
