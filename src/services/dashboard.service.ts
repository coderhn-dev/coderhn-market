import type { DashboardStats } from '@/types';
import { COUNTRIES } from '@/mocks/catalog';
import { USE_MOCKS } from './config';
import { http } from './http';
import { db, delay } from './mockDb';

export interface DashboardService {
  stats(): Promise<DashboardStats>;
}

const mock: DashboardService = {
  stats() {
    const count = <T extends string>(items: T[], keys: T[]) =>
      Object.fromEntries(keys.map((k) => [k, items.filter((i) => i === k).length])) as Record<T, number>;
    return delay({
      products: count(db.products.map((p) => p.moderationStatus), ['aprobado', 'pendiente', 'rechazado']),
      actors: count(db.actors.map((a) => a.validationStatus), ['validado', 'en-revision', 'rechazado']),
      byCountry: COUNTRIES.map((c) => ({
        country: c.code,
        products: db.products.filter((p) => p.country === c.code && p.moderationStatus === 'aprobado').length,
      })),
    });
  },
};

const api: DashboardService = {
  stats: () => http.get<DashboardStats>('/dashboard/stats').then((r) => r.data),
};

export const dashboardService: DashboardService = USE_MOCKS ? mock : api;
