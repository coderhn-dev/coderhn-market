import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/** Avisa cuando hay una versión nueva o cuando la app ya funciona sin conexión. */
export function ReloadPrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh && !offlineReady) return null;
  const close = () => {
    setNeedRefresh(false);
    setOfflineReady(false);
  };

  return (
    <div
      role="alert"
      className="fixed inset-x-4 bottom-24 z-50 flex items-center gap-3 rounded-2xl bg-stone-900 p-4 text-sm text-white shadow-xl md:right-6 md:bottom-6 md:left-auto md:max-w-sm"
    >
      <p className="flex-1">{needRefresh ? 'Hay una nueva versión disponible.' : 'Listo: la aplicación funciona sin conexión.'}</p>
      {needRefresh && (
        <Button size="sm" onClick={() => updateServiceWorker(true)} icon={<RefreshCw className="size-4" />}>
          Actualizar
        </Button>
      )}
      <button onClick={close} aria-label="Cerrar" className="grid size-8 place-items-center rounded-full hover:bg-white/10">
        <X className="size-4" />
      </button>
    </div>
  );
}
