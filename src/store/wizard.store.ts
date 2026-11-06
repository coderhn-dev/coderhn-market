import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { ProductDraft } from '@/types';

const EMPTY: ProductDraft = { name: '', location: '', whatsapp: '' };

interface WizardState {
  step: number;
  draft: ProductDraft;
  setStep: (step: number) => void;
  update: (patch: Partial<ProductDraft>) => void;
  reset: () => void;
}

/**
 * Borrador persistido: si se pierde la señal o se cierra la app a mitad
 * del asistente, el productor retoma donde se quedó.
 */
export const useWizard = create<WizardState>()(
  persist(
    (set) => ({
      step: 0,
      draft: EMPTY,
      setStep: (step) => set({ step }),
      update: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      reset: () => set({ step: 0, draft: EMPTY }),
    }),
    { name: 'cv-sica-wizard', storage: createJSONStorage(() => localStorage) },
  ),
);
