import { useState } from 'react';
import { ArrowLeft, ArrowRight, Camera, Check, CheckCircle2, MapPin, MessageCircle, Tag, Wallet, type LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonLink } from '@/components/ui/Button';
import { ProductImage } from '@/components/products/ProductImage';
import { useSession, can } from '@/store/session.store';
import { useWizard } from '@/store/wizard.store';
import { productsService } from '@/services';
import { getCountry, getUnit } from '@/mocks/catalog';
import { formatPrice } from '@/utils/format';
import type { ProductDraft } from '@/types';
import { cn } from '@/utils/cn';
import { LocationStep, NameStep, PhotoStep, PriceStep, WhatsAppStep, type StepProps } from './steps';

interface StepDef {
  title: string;
  icon: LucideIcon;
  Component: (p: StepProps) => React.ReactNode;
  valid: (d: ProductDraft) => boolean;
}

const STEPS: StepDef[] = [
  { title: 'Foto del producto', icon: Camera, Component: PhotoStep, valid: () => true },
  { title: 'Nombre y categoría', icon: Tag, Component: NameStep, valid: (d) => !!d.category && d.name.trim().length >= 3 },
  { title: 'Precio y unidad', icon: Wallet, Component: PriceStep, valid: (d) => !!d.unit && (d.price ?? 0) > 0 },
  { title: 'Ubicación', icon: MapPin, Component: LocationStep, valid: (d) => !!d.country && d.location.trim().length >= 2 },
  { title: 'WhatsApp', icon: MessageCircle, Component: WhatsAppStep, valid: (d) => d.whatsapp.length >= 7 },
];

export default function PublishWizardPage() {
  const role = useSession((s) => s.role);
  const userName = useSession((s) => s.userName);
  const { step, draft, setStep, update, reset } = useWizard();
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  if (!can.publish(role)) {
    return (
      <div className="mx-auto max-w-md space-y-4 rounded-3xl bg-white p-6 text-center ring-1 ring-stone-200">
        <h1 className="text-xl font-bold">Publica tus productos</h1>
        <p className="text-stone-600">Para publicar necesitas una cuenta de productor. En esta demo, cambia tu rol a <strong>Productor</strong> en la parte superior.</p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md space-y-5 py-8 text-center">
        <CheckCircle2 className="mx-auto size-24 text-brand-600" />
        <h1 className="text-2xl font-bold">¡Listo! Tu producto fue enviado</h1>
        <p className="text-lg text-stone-600">Un promotor digital lo revisará y aparecerá pronto en el mercado.</p>
        <div className="space-y-3">
          <Button size="xl" block onClick={() => setDone(false)}>Publicar otro</Button>
          <ButtonLink to="/mercado" size="lg" variant="secondary" block>Ir al mercado</ButtonLink>
        </div>
      </div>
    );
  }

  const isReview = step === STEPS.length;
  const current = STEPS[Math.min(step, STEPS.length - 1)]!;
  const canNext = isReview || current.valid(draft);

  const submit = async () => {
    if (!draft.category || !draft.unit || !draft.country || draft.price === undefined) return;
    setSending(true);
    try {
      await productsService.create({
        name: draft.name.trim(),
        category: draft.category,
        price: draft.price,
        unit: draft.unit,
        country: draft.country,
        location: draft.location.trim(),
        whatsapp: getCountry(draft.country).dialCode + draft.whatsapp,
        image: draft.image,
        producerName: userName,
      });
      reset();
      setDone(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      {/* Progreso: círculos grandes numerados */}
      <ol className="mb-6 flex items-center justify-between gap-1" aria-label="Pasos">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const state = i < step ? 'done' : i === step ? 'current' : 'todo';
          return (
            <li key={s.title} className="flex flex-1 items-center gap-1 last:flex-none">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                disabled={i >= step}
                aria-current={state === 'current' ? 'step' : undefined}
                aria-label={`Paso ${i + 1}: ${s.title}`}
                className={cn(
                  'grid size-11 shrink-0 place-items-center rounded-full font-bold md:size-12',
                  state === 'done' && 'bg-brand-700 text-white',
                  state === 'current' && 'bg-brand-100 text-brand-800 ring-2 ring-brand-700',
                  state === 'todo' && 'bg-stone-200 text-stone-500',
                )}
              >
                {state === 'done' ? <Check className="size-5" /> : <Icon className="size-5" />}
              </button>
              {i < STEPS.length - 1 && <span className={cn('h-1 flex-1 rounded', i < step ? 'bg-brand-700' : 'bg-stone-200')} />}
            </li>
          );
        })}
      </ol>

      <h1 className="mb-1 text-sm font-semibold text-brand-700">
        {isReview ? 'Revisa y envía' : `Paso ${step + 1} de ${STEPS.length}`}
      </h1>
      <h2 className="mb-5 text-2xl font-bold md:text-3xl">{isReview ? '¿Todo está bien?' : current.title}</h2>

      <div className="mb-32 md:mb-8">
        {isReview ? <Review draft={draft} onEdit={setStep} /> : <current.Component draft={draft} update={update} />}
      </div>

      {/* Botonera grande y fija en móvil */}
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-20 flex gap-3 border-t border-stone-200 bg-white/95 p-3 backdrop-blur md:static md:border-0 md:bg-transparent md:p-0">
        <Button
          variant="secondary"
          size="xl"
          onClick={() => (step === 0 ? navigate(-1) : setStep(step - 1))}
          icon={<ArrowLeft className="size-6" />}
          aria-label="Atrás"
          className="px-5"
        />
        {isReview ? (
          <Button size="xl" block onClick={submit} disabled={sending} icon={<Check className="size-6" />}>
            {sending ? 'Enviando…' : 'Publicar'}
          </Button>
        ) : (
          <Button size="xl" block onClick={() => setStep(step + 1)} disabled={!canNext}>
            {step === 0 && !draft.image ? 'Saltar' : 'Siguiente'} <ArrowRight className="size-6" />
          </Button>
        )}
      </div>
    </div>
  );
}

function Review({ draft, onEdit }: { draft: ProductDraft; onEdit: (step: number) => void }) {
  const country = draft.country ? getCountry(draft.country) : undefined;
  const rows: [string, string, number][] = [
    ['Producto', draft.name, 1],
    ['Precio', country && draft.price !== undefined && draft.unit ? `${formatPrice(draft.price, country.currency)} / ${getUnit(draft.unit).label}` : '—', 2],
    ['Ubicación', `${draft.location}${country ? `, ${country.flag} ${country.name}` : ''}`, 3],
    ['WhatsApp', `+${country?.dialCode ?? ''} ${draft.whatsapp}`, 4],
  ];
  return (
    <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200 md:grid md:grid-cols-2">
      <button type="button" onClick={() => onEdit(0)} className="block w-full">
        <ProductImage src={draft.image} alt={draft.name} category={draft.category ?? 'hortalizas'} className="aspect-square w-full" />
      </button>
      <div className="divide-y divide-stone-100">
        {rows.map(([label, value, s]) => (
          <button key={label} type="button" onClick={() => onEdit(s)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-stone-50">
            <span>
              <span className="block text-sm text-stone-500">{label}</span>
              <span className="block text-lg font-semibold">{value}</span>
            </span>
            <span className="text-sm font-medium text-brand-700">Cambiar</span>
          </button>
        ))}
      </div>
    </div>
  );
}
