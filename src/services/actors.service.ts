import type { Actor, ActorType, CountryCode, ValidationStatus, ValueChainId } from '@/types';
import { USE_MOCKS } from './config';
import { http } from './http';
import { db, delay, persist } from './mockDb';

export interface ActorFilters {
  search?: string;
  country?: CountryCode;
  type?: ActorType;
  valueChain?: ValueChainId;
  status?: ValidationStatus;
}

export interface ActorsService {
  list(filters?: ActorFilters): Promise<Actor[]>;
  getById(id: string): Promise<Actor | undefined>;
  updateValidation(id: string, status: ValidationStatus): Promise<Actor>;
}

const mock: ActorsService = {
  list(f = {}) {
    const q = f.search?.toLowerCase() ?? '';
    return delay(
      db.actors
        .filter((a) => !f.country || a.country === f.country)
        .filter((a) => !f.type || a.type === f.type)
        .filter((a) => !f.valueChain || a.valueChains.includes(f.valueChain))
        .filter((a) => !f.status || a.validationStatus === f.status)
        .filter((a) => !q || `${a.name} ${a.location}`.toLowerCase().includes(q)),
    );
  },
  getById: (id) => delay(db.actors.find((a) => a.id === id)),
  updateValidation(id, status) {
    const a = db.actors.find((x) => x.id === id);
    if (!a) return Promise.reject(new Error('Actor no encontrado'));
    a.validationStatus = status;
    persist();
    return delay(a);
  },
};

const api: ActorsService = {
  list: (filters) => http.get<Actor[]>('/actors', { params: filters }).then((r) => r.data),
  getById: (id) => http.get<Actor>(`/actors/${id}`).then((r) => r.data),
  updateValidation: (id, status) => http.patch<Actor>(`/actors/${id}/validation`, { status }).then((r) => r.data),
};

export const actorsService: ActorsService = USE_MOCKS ? mock : api;
