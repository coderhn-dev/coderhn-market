import type { Course, Resource } from '@/types';

export const RESOURCES: Resource[] = [
  { id: 'r-01', title: 'Guía de buenas prácticas de cosecha de café', type: 'pdf', topic: 'Producción', valueChain: 'cafe', url: '#', sizeMb: 1.2, publishedAt: '2026-06-10' },
  { id: 'r-02', title: 'Cómo fermentar cacao fino de aroma', type: 'video', topic: 'Poscosecha', valueChain: 'cacao', url: '#', durationMin: 12, sizeMb: 35, publishedAt: '2026-07-01' },
  { id: 'r-03', title: 'Calcula tu precio de venta (hoja práctica)', type: 'guia', topic: 'Comercialización', url: '#', sizeMb: 0.4, publishedAt: '2026-05-18' },
  { id: 'r-04', title: 'Manejo sanitario de colmenas', type: 'pdf', topic: 'Producción', valueChain: 'miel', url: '#', sizeMb: 2.1, publishedAt: '2026-03-22' },
  { id: 'r-05', title: 'Toma buenas fotos de tus productos con el celular', type: 'video', topic: 'Marketing digital', url: '#', durationMin: 6, sizeMb: 18, publishedAt: '2026-08-09' },
  { id: 'r-06', title: 'Registro sanitario: pasos por país', type: 'guia', topic: 'Normativa', url: '#', sizeMb: 0.8, publishedAt: '2026-04-11' },
  { id: 'r-07', title: 'Hortalizas bajo macrotúnel', type: 'pdf', topic: 'Producción', valueChain: 'hortalizas', url: '#', sizeMb: 3.4, publishedAt: '2026-02-27' },
  { id: 'r-08', title: 'Almacenamiento de granos sin pérdidas', type: 'video', topic: 'Poscosecha', valueChain: 'granos-basicos', url: '#', durationMin: 9, sizeMb: 26, publishedAt: '2026-09-14' },
];

export const COURSES: Course[] = [
  { id: 'c-01', title: 'Comercialización digital para la agricultura familiar', modules: 6, hours: 12, enrolled: 842, url: '#' },
  { id: 'c-02', title: 'Promotores digitales rurales: nivel 1', modules: 4, hours: 8, enrolled: 315, url: '#' },
  { id: 'c-03', title: 'Gestión asociativa y cooperativa', modules: 5, hours: 10, enrolled: 527, url: '#' },
];
