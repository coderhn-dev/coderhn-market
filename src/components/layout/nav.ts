import {
  BookOpen,
  Home,
  LayoutDashboard,
  Lightbulb,
  Map,
  PlusCircle,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { Role } from '@/types';
import { can } from '@/store/session.store';

export interface NavItem {
  to: string;
  label: string;
  short: string;
  icon: LucideIcon;
  visible?: (role: Role) => boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Inicio', short: 'Inicio', icon: Home },
  { to: '/territorios', label: 'Territorios y cadenas', short: 'Territorios', icon: Map },
  { to: '/directorio', label: 'Directorio de actores', short: 'Directorio', icon: Users },
  { to: '/mercado', label: 'Mercado regional', short: 'Mercado', icon: Store },
  { to: '/recursos', label: 'Recursos y formación', short: 'Recursos', icon: BookOpen },
  { to: '/innovacion', label: 'Innovación rural', short: 'Innovación', icon: Lightbulb },
  { to: '/publicar', label: 'Publicar producto', short: 'Publicar', icon: PlusCircle, visible: can.publish },
  { to: '/admin', label: 'Panel de gestión', short: 'Panel', icon: LayoutDashboard, visible: can.moderate },
];
