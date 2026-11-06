import { ExternalLink, FileText, GraduationCap, PlayCircle, BookMarked, type LucideIcon } from 'lucide-react';
import type { ResourceType } from '@/types';
import { ButtonAnchor } from '@/components/ui/Button';
import { Chip, ChipRow } from '@/components/ui/Chip';
import { CardGrid, PageHeader } from '@/components/ui/PageHeader';
import { EmptyState, GridSkeleton } from '@/components/ui/Feedback';
import { useAsync } from '@/hooks/useAsync';
import { useQueryFilters } from '@/hooks/useQueryFilters';
import { resourcesService } from '@/services';
import { getValueChain } from '@/mocks/catalog';
import { formatDate } from '@/utils/format';

const TYPES: Record<ResourceType, { label: string; icon: LucideIcon; cls: string }> = {
  pdf: { label: 'PDF', icon: FileText, cls: 'bg-red-50 text-red-700' },
  guia: { label: 'Guía', icon: BookMarked, cls: 'bg-sky-50 text-sky-700' },
  video: { label: 'Video', icon: PlayCircle, cls: 'bg-violet-50 text-violet-700' },
};

export default function ResourcesPage() {
  const { values, set } = useQueryFilters(['tipo'] as const);
  const type = values.tipo as ResourceType | undefined;
  const { data: resources, loading } = useAsync(() => resourcesService.list(type), [type]);
  const { data: courses } = useAsync(() => resourcesService.listCourses(), []);

  return (
    <>
      <PageHeader title="Centro de recursos y formación" subtitle="Materiales descargables y cursos del aula virtual. Indicamos el peso para cuidar tus datos móviles." />

      {/* Aula virtual */}
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-earth-100 to-earth-50 p-5 ring-1 ring-earth-100 md:p-8">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-10 text-earth-700" />
            <div>
              <h2 className="text-xl font-bold">Aula virtual</h2>
              <p className="text-sm text-stone-600">Cursos certificados para productores y promotores digitales.</p>
            </div>
          </div>
          <ButtonAnchor href="#" variant="primary" icon={<ExternalLink className="size-4" />}>
            Entrar al aula virtual
          </ButtonAnchor>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {courses?.map((c) => (
            <a key={c.id} href={c.url} className="rounded-2xl bg-white p-4 ring-1 ring-stone-200 hover:shadow-md">
              <p className="font-semibold">{c.title}</p>
              <p className="mt-2 text-sm text-stone-500">
                {c.modules} módulos · {c.hours} h · {c.enrolled.toLocaleString('es')} inscritos
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Repositorio */}
      <h2 className="mb-3 text-xl font-bold">Repositorio de materiales</h2>
      <div className="mb-5">
        <ChipRow label="Tipo de recurso">
          <Chip active={!type} onClick={() => set('tipo')}>Todos</Chip>
          {(Object.keys(TYPES) as ResourceType[]).map((t) => {
            const Icon = TYPES[t].icon;
            return (
              <Chip key={t} active={type === t} onClick={() => set('tipo', type === t ? undefined : t)}>
                <Icon className="size-4" /> {TYPES[t].label}
              </Chip>
            );
          })}
        </ChipRow>
      </div>
      <CardGrid>
        {loading ? (
          <GridSkeleton className="h-36" />
        ) : resources?.length ? (
          resources.map((r) => {
            const t = TYPES[r.type];
            const Icon = t.icon;
            return (
              <a key={r.id} href={r.url} className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200 hover:shadow-md">
                <span className={`grid size-12 shrink-0 place-items-center rounded-xl ${t.cls}`}>
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-xs text-stone-500">
                    {t.label} · {r.topic}
                    {r.valueChain && ` · ${getValueChain(r.valueChain).emoji} ${getValueChain(r.valueChain).name}`}
                  </p>
                  <p className="text-xs text-stone-400">
                    {r.durationMin && `${r.durationMin} min · `}
                    {r.sizeMb && `${r.sizeMb} MB · `}
                    {formatDate(r.publishedAt)}
                  </p>
                </div>
              </a>
            );
          })
        ) : (
          <EmptyState title="No hay recursos de este tipo" />
        )}
      </CardGrid>
    </>
  );
}
