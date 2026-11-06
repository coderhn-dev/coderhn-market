import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/** Hoja inferior en móvil, diálogo centrado en tablet/escritorio. Usa <dialog> nativo. */
export function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 backdrop:bg-stone-950/50 md:m-auto md:max-w-lg md:rounded-3xl"
    >
      <div className="pb-safe">
        <header className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="grid size-10 place-items-center rounded-full hover:bg-stone-100" aria-label="Cerrar">
            <X className="size-5" />
          </button>
        </header>
        <div className="max-h-[80dvh] overflow-y-auto p-5">{children}</div>
      </div>
    </dialog>
  );
}
