import { useRef, useState } from 'react';
import { Camera, ImagePlus, Loader2, MapPin, Phone, Trash2 } from 'lucide-react';
import type { ProductDraft } from '@/types';
import { COUNTRIES, UNITS, VALUE_CHAINS, getCountry } from '@/mocks/catalog';
import { compressImage } from '@/utils/image';
import { cn } from '@/utils/cn';

export interface StepProps {
  draft: ProductDraft;
  update: (patch: Partial<ProductDraft>) => void;
}

/** Botón-tarjeta grande con ícono: el patrón base del asistente. */
function BigOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex min-h-20 flex-col items-center justify-center gap-1 rounded-2xl p-3 text-base font-semibold ring-2 transition',
        active ? 'bg-brand-50 text-brand-900 ring-brand-700' : 'bg-white text-stone-800 ring-stone-200 hover:ring-stone-300',
      )}
    >
      {children}
    </button>
  );
}

const inputCls =
  'h-16 w-full rounded-2xl bg-white px-5 text-xl ring-2 ring-stone-200 placeholder:text-stone-400 focus:ring-brand-700 focus:outline-none';

export function PhotoStep({ draft, update }: StepProps) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      update({ image: await compressImage(file) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4">
      <input ref={input} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      {draft.image ? (
        <div className="relative">
          <img src={draft.image} alt="Foto del producto" className="aspect-square w-full rounded-3xl object-cover" />
          <button
            type="button"
            onClick={() => update({ image: undefined })}
            className="absolute top-3 right-3 flex h-12 items-center gap-2 rounded-full bg-white/95 px-4 font-semibold text-red-700 shadow"
          >
            <Trash2 className="size-5" /> Quitar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-3xl border-4 border-dashed border-brand-200 bg-brand-50 text-brand-800"
        >
          {busy ? <Loader2 className="size-16 animate-spin" /> : <Camera className="size-20" />}
          <span className="text-2xl font-bold">Tomar foto</span>
        </button>
      )}
      {draft.image && (
        <button type="button" onClick={() => input.current?.click()} className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-lg font-semibold ring-2 ring-stone-200">
          <ImagePlus className="size-6" /> Cambiar foto
        </button>
      )}
      <p className="text-center text-sm text-stone-500">Puedes saltar este paso si no tienes foto.</p>
    </div>
  );
}

export function NameStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {VALUE_CHAINS.map((v) => (
          <BigOption key={v.id} active={draft.category === v.id} onClick={() => update({ category: v.id })}>
            <span className="text-4xl" aria-hidden>{v.emoji}</span>
            {v.name}
          </BigOption>
        ))}
      </div>
      <label className="block">
        <span className="mb-2 block text-lg font-semibold">¿Qué vendes?</span>
        <input className={inputCls} value={draft.name} onChange={(e) => update({ name: e.target.value })} placeholder="Ej: Café tostado" maxLength={80} />
      </label>
    </div>
  );
}

export function PriceStep({ draft, update }: StepProps) {
  const currency = draft.country ? getCountry(draft.country).currency : '';
  return (
    <div className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-lg font-semibold">Precio {currency && `(${currency})`}</span>
        <input
          className={inputCls}
          type="number"
          inputMode="decimal"
          min={0}
          step="any"
          value={draft.price ?? ''}
          onChange={(e) => update({ price: e.target.value === '' ? undefined : Number(e.target.value) })}
          placeholder="0"
        />
      </label>
      <div>
        <span className="mb-2 block text-lg font-semibold">¿Por cuánto?</span>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {UNITS.map((u) => (
            <BigOption key={u.id} active={draft.unit === u.id} onClick={() => update({ unit: u.id })}>
              <span className="text-2xl">{u.short}</span>
              <span className="text-xs font-medium text-stone-500">{u.label}</span>
            </BigOption>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LocationStep({ draft, update }: StepProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {COUNTRIES.map((c) => (
          <BigOption key={c.code} active={draft.country === c.code} onClick={() => update({ country: c.code })}>
            <span className="text-4xl" aria-hidden>{c.flag}</span>
            <span className="text-sm">{c.name}</span>
          </BigOption>
        ))}
      </div>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-lg font-semibold"><MapPin className="size-5" /> Comunidad o municipio</span>
        <input className={inputCls} value={draft.location} onChange={(e) => update({ location: e.target.value })} placeholder="Ej: Gracias, Lempira" />
      </label>
    </div>
  );
}

export function WhatsAppStep({ draft, update }: StepProps) {
  const dial = draft.country ? getCountry(draft.country).dialCode : '';
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-lg font-semibold"><Phone className="size-5" /> Tu número de WhatsApp</span>
      <div className="flex gap-2">
        <span className="grid h-16 min-w-20 place-items-center rounded-2xl bg-stone-100 px-3 text-xl font-semibold">+{dial}</span>
        <input
          className={inputCls}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={draft.whatsapp}
          onChange={(e) => update({ whatsapp: e.target.value.replace(/\D/g, '') })}
          placeholder="9999 9999"
          maxLength={12}
        />
      </div>
      <span className="mt-3 block text-sm text-stone-500">Los compradores te escribirán directamente a este número.</span>
    </label>
  );
}
