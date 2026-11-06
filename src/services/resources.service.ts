import type { Course, Resource, ResourceType } from '@/types';
import { COURSES, RESOURCES } from '@/mocks/resources';
import { USE_MOCKS } from './config';
import { http } from './http';
import { delay } from './mockDb';

export interface ResourcesService {
  list(type?: ResourceType): Promise<Resource[]>;
  listCourses(): Promise<Course[]>;
}

const mock: ResourcesService = {
  list: (type) => delay(RESOURCES.filter((r) => !type || r.type === type)),
  listCourses: () => delay(COURSES),
};

const api: ResourcesService = {
  list: (type) => http.get<Resource[]>('/resources', { params: { type } }).then((r) => r.data),
  listCourses: () => http.get<Course[]>('/courses').then((r) => r.data),
};

export const resourcesService: ResourcesService = USE_MOCKS ? mock : api;
