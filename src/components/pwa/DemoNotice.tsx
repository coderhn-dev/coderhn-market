import { Info } from 'lucide-react';
import { DEMO_MODE } from '@/services/config';

/** Aviso visible de prototipo: deja claro que no es un servicio real. */
export function DemoNotice() {
  if (!DEMO_MODE) return null;
  return (
    <div className="flex items-center justify-center gap-2 bg-stone-900 px-4 py-1.5 text-center text-xs text-stone-200">
      <Info className="size-3.5 shrink-0" aria-hidden />
      <span>
        Prototipo demostrativo · Portafolio <strong className="text-white">CoderHN</strong> · Datos ficticios
      </span>
    </div>
  );
}
