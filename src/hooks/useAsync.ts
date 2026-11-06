import { useCallback, useEffect, useRef, useState } from 'react';

/** Ejecuta una promesa de servicio y expone estado de carga/error. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const callId = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fn, deps);

  const reload = useCallback(() => {
    const id = ++callId.current;
    setLoading(true);
    setError(undefined);
    run()
      .then((d) => id === callId.current && setData(d))
      .catch((e: unknown) => id === callId.current && setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => id === callId.current && setLoading(false));
  }, [run]);

  useEffect(reload, [reload]);

  return { data, loading, error, reload, setData };
}
