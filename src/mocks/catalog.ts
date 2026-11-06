import type { Country, CountryCode, ValueChain, ValueChainId, Unit } from '@/types';

export const COUNTRIES: Country[] = [
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', dialCode: '502', currency: 'GTQ' },
  { code: 'BZ', name: 'Belice', flag: '🇧🇿', dialCode: '501', currency: 'BZD' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', dialCode: '503', currency: 'USD' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', dialCode: '504', currency: 'HNL' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', dialCode: '505', currency: 'NIO' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', dialCode: '506', currency: 'CRC' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦', dialCode: '507', currency: 'USD' },
  { code: 'DO', name: 'República Dominicana', flag: '🇩🇴', dialCode: '1', currency: 'DOP' },
];

export const VALUE_CHAINS: ValueChain[] = [
  { id: 'cafe', name: 'Café', emoji: '☕', tone: 'bg-amber-100 text-amber-900', description: 'Café de altura, especial y orgánico de fincas familiares.' },
  { id: 'cacao', name: 'Cacao', emoji: '🍫', tone: 'bg-orange-100 text-orange-900', description: 'Cacao fino de aroma y derivados artesanales.' },
  { id: 'hortalizas', name: 'Hortalizas', emoji: '🥬', tone: 'bg-green-100 text-green-900', description: 'Hortalizas frescas de producción familiar y agroecológica.' },
  { id: 'miel', name: 'Miel', emoji: '🍯', tone: 'bg-yellow-100 text-yellow-900', description: 'Miel de abeja y productos apícolas.' },
  { id: 'granos-basicos', name: 'Granos básicos', emoji: '🌽', tone: 'bg-lime-100 text-lime-900', description: 'Maíz, frijol, arroz y sorgo para la seguridad alimentaria.' },
];

export const UNITS: { id: Unit; label: string; short: string }[] = [
  { id: 'lb', label: 'Libra', short: 'lb' },
  { id: 'kg', label: 'Kilogramo', short: 'kg' },
  { id: 'qq', label: 'Quintal', short: 'qq' },
  { id: 'unidad', label: 'Unidad', short: 'u' },
  { id: 'docena', label: 'Docena', short: 'doc' },
  { id: 'litro', label: 'Litro', short: 'L' },
  { id: 'caja', label: 'Caja', short: 'caja' },
];

const byCode = new Map(COUNTRIES.map((c) => [c.code, c]));
const byChain = new Map(VALUE_CHAINS.map((v) => [v.id, v]));

export const getCountry = (code: CountryCode) => byCode.get(code)!;
export const getValueChain = (id: ValueChainId) => byChain.get(id)!;
export const getUnit = (id: Unit) => UNITS.find((u) => u.id === id)!;
