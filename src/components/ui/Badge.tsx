import type { ReactNode } from 'react';
import { BadgeCheck, Clock, XCircle } from 'lucide-react';
import type { ModerationStatus, ValidationStatus } from '@/types';
import { cn } from '@/utils/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', className)}>
      {children}
    </span>
  );
}

const VALIDATION = {
  validado: { label: 'Validado', cls: 'bg-brand-100 text-brand-800', Icon: BadgeCheck },
  'en-revision': { label: 'En revisión', cls: 'bg-amber-100 text-amber-800', Icon: Clock },
  rechazado: { label: 'Rechazado', cls: 'bg-red-100 text-red-700', Icon: XCircle },
} as const;

export function ValidationBadge({ status, className }: { status: ValidationStatus; className?: string }) {
  const { label, cls, Icon } = VALIDATION[status];
  return (
    <Badge className={cn(cls, className)}>
      <Icon className="size-3.5" aria-hidden />
      {label}
    </Badge>
  );
}

const MODERATION = {
  aprobado: { label: 'Aprobado', cls: 'bg-brand-100 text-brand-800' },
  pendiente: { label: 'Pendiente', cls: 'bg-amber-100 text-amber-800' },
  rechazado: { label: 'Rechazado', cls: 'bg-red-100 text-red-700' },
} as const;

export function ModerationBadge({ status }: { status: ModerationStatus }) {
  const { label, cls } = MODERATION[status];
  return <Badge className={cls}>{label}</Badge>;
}
