import type { Territory } from '@/types';

export const TERRITORIES: Territory[] = [
  { id: 't-hn-lempira', name: 'Corredor Seco Lempira', country: 'HN', department: 'Lempira', description: 'Territorio de café de altura y granos básicos con fuerte presencia de cooperativas lencas.', valueChains: ['cafe', 'granos-basicos'], families: 3200, organizations: 41 },
  { id: 't-hn-olancho', name: 'Valle de Olancho', country: 'HN', department: 'Olancho', description: 'Producción apícola y de hortalizas en sistemas agroforestales.', valueChains: ['miel', 'hortalizas'], families: 1800, organizations: 22 },
  { id: 't-sv-chalate', name: 'Montaña de Chalatenango', country: 'SV', department: 'Chalatenango', description: 'Hortalizas de clima frío y emprendimientos de mujeres rurales.', valueChains: ['hortalizas', 'cafe'], families: 1450, organizations: 18 },
  { id: 't-gt-huehue', name: 'Altiplano de Huehuetenango', country: 'GT', department: 'Huehuetenango', description: 'Uno de los orígenes de café especial más reconocidos de la región.', valueChains: ['cafe', 'miel'], families: 5100, organizations: 63 },
  { id: 't-gt-peten', name: 'Petén Sur', country: 'GT', department: 'Petén', description: 'Cacao y miel de bosque bajo manejo comunitario.', valueChains: ['cacao', 'miel'], families: 980, organizations: 12 },
  { id: 't-ni-matagalpa', name: 'Norte de Matagalpa', country: 'NI', department: 'Matagalpa', description: 'Café y cacao en fincas familiares diversificadas.', valueChains: ['cafe', 'cacao', 'granos-basicos'], families: 2700, organizations: 34 },
  { id: 't-cr-brunca', name: 'Región Brunca', country: 'CR', department: 'Puntarenas', description: 'Cacao fino de aroma y turismo rural comunitario.', valueChains: ['cacao', 'hortalizas'], families: 860, organizations: 15 },
  { id: 't-pa-cocle', name: 'Altos de Coclé', country: 'PA', department: 'Coclé', description: 'Granos básicos y hortalizas para mercados urbanos.', valueChains: ['granos-basicos', 'hortalizas'], families: 1120, organizations: 14 },
  { id: 't-bz-toledo', name: 'Toledo', country: 'BZ', department: 'Toledo', description: 'Cacao orgánico maya y apicultura.', valueChains: ['cacao', 'miel'], families: 640, organizations: 9 },
  { id: 't-do-cibao', name: 'Cibao Central', country: 'DO', department: 'Santiago', description: 'Cacao, café y granos en la principal zona agrícola del país.', valueChains: ['cacao', 'cafe', 'granos-basicos'], families: 2300, organizations: 27 },
];
