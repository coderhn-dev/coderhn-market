import { useSearchParams } from 'react-router-dom';

/**
 * Filtros sincronizados con la URL: se pueden compartir por WhatsApp
 * y sobreviven a recargas sin estado extra.
 */
export function useQueryFilters<K extends string>(keys: readonly K[]) {
  const [params, setParams] = useSearchParams();
  const values = Object.fromEntries(keys.map((k) => [k, params.get(k) ?? undefined])) as Record<K, string | undefined>;

  const set = (key: K, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const clear = () => setParams(new URLSearchParams(), { replace: true });

  return { values, set, clear, active: keys.some((k) => params.has(k)) };
}
