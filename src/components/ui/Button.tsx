import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900',
  secondary: 'bg-white text-stone-800 ring-1 ring-stone-300 hover:bg-stone-50',
  ghost: 'text-stone-700 hover:bg-stone-100',
  whatsapp: 'bg-[#25D366] text-stone-950 hover:bg-[#1ebe5b]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

// Tamaños táctiles: mínimo 44px; "xl" para el asistente de baja alfabetización.
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-4 text-sm gap-2',
  lg: 'h-13 px-5 text-base gap-2',
  xl: 'h-16 px-6 text-lg gap-3',
};

interface Common {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  icon?: ReactNode;
}

const classes = ({ variant = 'primary', size = 'md', block }: Common, extra?: string) =>
  cn(
    'inline-flex items-center justify-center rounded-xl font-semibold transition-colors select-none',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    block && 'w-full',
    extra,
  );

export const Button = forwardRef<HTMLButtonElement, Common & ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ variant, size, block, icon, className, children, ...rest }, ref) => (
    <button ref={ref} className={classes({ variant, size, block }, className)} {...rest}>
      {icon}
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export function ButtonLink({ variant, size, block, icon, className, children, ...rest }: Common & LinkProps) {
  return (
    <Link className={classes({ variant, size, block }, className)} {...rest}>
      {icon}
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant,
  size,
  block,
  icon,
  className,
  children,
  ...rest
}: Common & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={classes({ variant, size, block }, className)} {...rest}>
      {icon}
      {children}
    </a>
  );
}
