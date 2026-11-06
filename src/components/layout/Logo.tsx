import { Link } from 'react-router-dom';

export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Centro Virtual SICA – inicio">
      <img src="/icons/favicon.svg" alt="" className="size-9 shrink-0" width={36} height={36} />
      {withText && (
        <span className="leading-tight">
          <span className="block text-sm font-bold text-brand-900">Centro Virtual</span>
          <span className="block text-xs text-stone-500">Innovación Rural · SICA</span>
        </span>
      )}
    </Link>
  );
}
