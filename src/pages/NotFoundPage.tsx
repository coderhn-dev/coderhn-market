import { ButtonLink } from '@/components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md space-y-4 py-16 text-center">
      <p className="text-6xl">🌱</p>
      <h1 className="text-2xl font-bold">Página no encontrada</h1>
      <ButtonLink to="/">Volver al inicio</ButtonLink>
    </div>
  );
}
