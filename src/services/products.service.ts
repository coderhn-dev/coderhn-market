import type { ModerationStatus, Product, ProductDraft, ProductFilters } from '@/types';
import { getCountry } from '@/mocks/catalog';
import { USE_MOCKS } from './config';
import { http } from './http';
import { db, delay, persist, uid } from './mockDb';

export interface ProductsService {
  list(filters?: ProductFilters): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  listByActor(actorId: string): Promise<Product[]>;
  create(draft: Required<Omit<ProductDraft, 'image'>> & { image?: string; producerName: string }): Promise<Product>;
  updateStatus(id: string, status: ModerationStatus): Promise<Product>;
}

const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

const mock: ProductsService = {
  list(filters = {}) {
    const q = filters.search ? normalize(filters.search) : '';
    const status = filters.status ?? 'aprobado';
    const result = db.products
      .filter((p) => p.moderationStatus === status)
      .filter((p) => !filters.country || p.country === filters.country)
      .filter((p) => !filters.category || p.category === filters.category)
      .filter((p) => !q || normalize(`${p.name} ${p.producerName} ${p.location}`).includes(q))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return delay(result);
  },
  getById(id) {
    return delay(db.products.find((p) => p.id === id));
  },
  listByActor(actorId) {
    return delay(db.products.filter((p) => p.actorId === actorId && p.moderationStatus === 'aprobado'));
  },
  create(input) {
    const product: Product = {
      id: uid('p'),
      name: input.name,
      category: input.category,
      description: '',
      price: input.price,
      currency: getCountry(input.country).currency,
      unit: input.unit,
      image: input.image,
      producerName: input.producerName,
      country: input.country,
      location: input.location,
      whatsapp: input.whatsapp,
      moderationStatus: 'pendiente',
      createdAt: new Date().toISOString(),
    };
    db.products.unshift(product);
    persist();
    return delay(product, 500);
  },
  updateStatus(id, status) {
    const p = db.products.find((x) => x.id === id);
    if (!p) return Promise.reject(new Error('Producto no encontrado'));
    p.moderationStatus = status;
    persist();
    return delay(p);
  },
};

const api: ProductsService = {
  list: (filters) => http.get<Product[]>('/products', { params: filters }).then((r) => r.data),
  getById: (id) => http.get<Product>(`/products/${id}`).then((r) => r.data),
  listByActor: (actorId) => http.get<Product[]>(`/actors/${actorId}/products`).then((r) => r.data),
  create: (input) => http.post<Product>('/products', input).then((r) => r.data),
  updateStatus: (id, status) => http.patch<Product>(`/products/${id}/status`, { status }).then((r) => r.data),
};

export const productsService: ProductsService = USE_MOCKS ? mock : api;
