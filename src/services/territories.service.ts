import type { CountryCode, Territory, ValueChainId } from '@/types';
import { TERRITORIES } from '@/mocks/territories';
import { USE_MOCKS } from './config';
import { http } from './http';
import { delay } from './mockDb';

export interface TerritoryFilters {
  country?: CountryCode;
  valueChain?: ValueChainId;
}

export interface TerritoriesService {
  list(filters?: TerritoryFilters): Promise<Territory[]>;
}

const mock: TerritoriesService = {
  list: (f = {}) =>
    delay(
      TERRITORIES.filter((t) => !f.country || t.country === f.country).filter(
        (t) => !f.valueChain || t.valueChains.includes(f.valueChain),
      ),
    ),
};

const api: TerritoriesService = {
  list: (filters) => http.get<Territory[]>('/territories', { params: filters }).then((r) => r.data),
};

export const territoriesService: TerritoriesService = USE_MOCKS ? mock : api;
