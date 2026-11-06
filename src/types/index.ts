/**
 * Modelo de dominio de CoderHN Market.
 * Estas interfaces son el contrato entre la UI y la capa de servicios:
 * el backend (Node.js + PostgreSQL) deberá respetar las mismas formas.
 */

/** Países de Centroamérica y República Dominicana (ISO 3166-1 alpha-2). */
export type CountryCode = 'BZ' | 'CR' | 'SV' | 'GT' | 'HN' | 'NI' | 'PA' | 'DO';

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  dialCode: string;
  currency: string;
}

export type ValueChainId = 'cafe' | 'cacao' | 'hortalizas' | 'miel' | 'granos-basicos';

export interface ValueChain {
  id: ValueChainId;
  name: string;
  description: string;
  emoji: string;
  /** Clases Tailwind de color de acento (fondo suave + texto). */
  tone: string;
}

export interface Territory {
  id: string;
  name: string;
  country: CountryCode;
  department: string;
  description: string;
  valueChains: ValueChainId[];
  families: number;
  organizations: number;
}

export type ActorType =
  | 'organizacion-af'
  | 'cooperativa'
  | 'emprendimiento-jovenes'
  | 'emprendimiento-mujeres';

export type ValidationStatus = 'validado' | 'en-revision' | 'rechazado';

export interface Actor {
  id: string;
  name: string;
  type: ActorType;
  country: CountryCode;
  territoryId: string;
  location: string;
  description: string;
  valueChains: ValueChainId[];
  members: number;
  foundedYear: number;
  whatsapp: string;
  email?: string;
  validationStatus: ValidationStatus;
}

export type ModerationStatus = 'aprobado' | 'pendiente' | 'rechazado';

export type Unit = 'lb' | 'kg' | 'qq' | 'unidad' | 'docena' | 'litro' | 'caja';

export interface Traceability {
  lot: string;
  harvestDate: string; // ISO date
  altitudeMasl?: number;
  practices: string[];
  certifications: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ValueChainId;
  description: string;
  /** Precio indicativo en moneda local. */
  price: number;
  currency: string;
  unit: Unit;
  /** URL o data-URL. Si falta, la UI muestra un placeholder ligero. */
  image?: string;
  actorId?: string;
  producerName: string;
  country: CountryCode;
  location: string;
  whatsapp: string;
  moderationStatus: ModerationStatus;
  createdAt: string; // ISO datetime
  traceability?: Traceability;
}

export interface ProductFilters {
  search?: string;
  country?: CountryCode;
  category?: ValueChainId;
  status?: ModerationStatus;
}

/** Datos capturados por el asistente guiado de publicación. */
export interface ProductDraft {
  image?: string;
  name: string;
  category?: ValueChainId;
  price?: number;
  unit?: Unit;
  country?: CountryCode;
  location: string;
  whatsapp: string;
}

export type ResourceType = 'pdf' | 'guia' | 'video';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  topic: string;
  valueChain?: ValueChainId;
  url: string;
  /** Peso del archivo en MB (útil para usuarios con datos limitados). */
  sizeMb?: number;
  durationMin?: number;
  publishedAt: string;
}

export interface Course {
  id: string;
  title: string;
  modules: number;
  hours: number;
  enrolled: number;
  url: string;
}

export type Role = 'admin' | 'promotor' | 'productor' | 'visitante';

export interface DashboardStats {
  products: Record<ModerationStatus, number>;
  actors: Record<ValidationStatus, number>;
  byCountry: { country: CountryCode; products: number }[];
}
