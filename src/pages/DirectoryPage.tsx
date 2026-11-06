import type { ActorType, CountryCode, ValueChainId } from '@/types';
import { CardGrid, PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { Chip, ChipRow } from '@/components/ui/Chip';
import { EmptyState, ErrorState, GridSkeleton } from '@/components/ui/Feedback';
import { ActorCard } from '@/components/actors/ActorCard';
import { ACTOR_TYPE_LABELS } from '@/components/actors/labels';
import { useAsync } from '@/hooks/useAsync';
import { useQueryFilters } from '@/hooks/useQueryFilters';
import { actorsService } from '@/services';

export default function DirectoryPage() {
  const { values, set, clear, active } = useQueryFilters(['q', 'pais', 'cadena', 'tipo'] as const);
  const filters = {
    search: values.q,
    country: values.pais as CountryCode | undefined,
    valueChain: values.cadena as ValueChainId | undefined,
    type: values.tipo as ActorType | undefined,
  };
  const { data, loading, error, reload } = useAsync(() => actorsService.list(filters), [values.q, values.pais, values.cadena, values.tipo]);

  return (
    <>
      <PageHeader title="Directorio de actores" subtitle="Organizaciones de agricultura familiar, cooperativas y emprendimientos de jóvenes y mujeres." />
      <div className="mb-6 space-y-3">
        <FilterBar
          search={values.q}
          country={filters.country}
          valueChain={filters.valueChain}
          onSearch={(q) => set('q', q)}
          onCountry={(c) => set('pais', c)}
          onValueChain={(v) => set('cadena', v)}
          onClear={clear}
          active={active}
          searchPlaceholder="Buscar organización o lugar…"
        />
        <ChipRow label="Tipo de actor">
          <Chip active={!filters.type} onClick={() => set('tipo')}>
            Todos los tipos
          </Chip>
          {(Object.keys(ACTOR_TYPE_LABELS) as ActorType[]).map((t) => (
            <Chip key={t} active={filters.type === t} onClick={() => set('tipo', filters.type === t ? undefined : t)}>
              {ACTOR_TYPE_LABELS[t]}
            </Chip>
          ))}
        </ChipRow>
      </div>
      <CardGrid>
        {error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : loading ? (
          <GridSkeleton />
        ) : data?.length ? (
          data.map((a) => <ActorCard key={a.id} actor={a} />)
        ) : (
          <EmptyState title="No encontramos actores con esos filtros" />
        )}
      </CardGrid>
    </>
  );
}
