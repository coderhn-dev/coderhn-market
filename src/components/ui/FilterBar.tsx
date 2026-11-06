import { useRef } from 'react';
import { Search, X } from 'lucide-react';
import type { CountryCode, ValueChainId } from '@/types';
import { COUNTRIES, VALUE_CHAINS } from '@/mocks/catalog';
import { Chip, ChipRow } from './Chip';

interface Props {
  country?: string;
  valueChain?: string;
  search?: string;
  onCountry: (c?: CountryCode) => void;
  onValueChain: (v?: ValueChainId) => void;
  onSearch?: (q?: string) => void;
  onClear?: () => void;
  active?: boolean;
  searchPlaceholder?: string;
}

export function FilterBar(p: Props) {
  // Debounce: evita una petición por cada tecla en redes lentas
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const input = useRef<HTMLInputElement>(null);
  const onType = (value: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => p.onSearch?.(value || undefined), 350);
  };

  return (
    <div className="space-y-3">
      {p.onSearch && (
        <label className="relative block">
          <span className="sr-only">Buscar</span>
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-stone-400" />
          <input
            ref={input}
            type="search"
            defaultValue={p.search}
            onChange={(e) => onType(e.target.value)}
            placeholder={p.searchPlaceholder ?? 'Buscar…'}
            className="h-12 w-full rounded-xl border-0 bg-white pr-4 pl-11 text-base ring-1 ring-stone-200 placeholder:text-stone-400 focus:ring-2 focus:ring-brand-600 focus:outline-none"
          />
        </label>
      )}
      <ChipRow label="Filtrar por cadena de valor">
        <Chip active={!p.valueChain} onClick={() => p.onValueChain(undefined)}>
          Todas
        </Chip>
        {VALUE_CHAINS.map((v) => (
          <Chip key={v.id} active={p.valueChain === v.id} onClick={() => p.onValueChain(p.valueChain === v.id ? undefined : v.id)}>
            <span aria-hidden>{v.emoji}</span> {v.name}
          </Chip>
        ))}
      </ChipRow>
      <ChipRow label="Filtrar por país">
        <Chip active={!p.country} onClick={() => p.onCountry(undefined)}>
          Región SICA
        </Chip>
        {COUNTRIES.map((c) => (
          <Chip key={c.code} active={p.country === c.code} onClick={() => p.onCountry(p.country === c.code ? undefined : c.code)}>
            <span aria-hidden>{c.flag}</span> {c.name}
          </Chip>
        ))}
      </ChipRow>
      {p.active && p.onClear && (
        <button
          onClick={() => {
            if (input.current) input.current.value = '';
            p.onClear?.();
          }}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
          <X className="size-4" /> Limpiar filtros
        </button>
      )}
    </div>
  );
}
