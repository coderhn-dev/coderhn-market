import type { CountryCode, ValueChainId } from '@/types';
import { CardGrid, PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { EmptyState, ErrorState, GridSkeleton } from '@/components/ui/Feedback';
import { TerritoryCard } from '@/components/territories/TerritoryCard';
import { useAsync } from '@/hooks/useAsync';
import { useQueryFilters } from '@/hooks/useQueryFilters';
import { territoriesService } from '@/services';
import { VALUE_CHAINS } from '@/mocks/catalog';

export default function TerritoriesPage() {
  const { values, set, clear, active } = useQueryFilters(['pais', 'cadena'] as const);
  const country = values.pais as CountryCode | undefined;
  const valueChain = values.cadena as ValueChainId | undefined;
  const { data, loading, error, reload } = useAsync(() => territoriesService.list({ country, valueChain }), [country, valueChain]);

  return (
    <>
      <PageHeader title="Territorios y cadenas de valor" subtitle="Territorios rurales de Centroamérica y República Dominicana y sus cadenas de valor priorizadas." />

      <section className="mb-8">
        <h2 className="sr-only">Cadenas de valor priorizadas</h2>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-5 md:px-0">
          {VALUE_CHAINS.map((v) => (
            <button
              key={v.id}
              onClick={() => set('cadena', valueChain === v.id ? undefined : v.id)}
              aria-pressed={valueChain === v.id}
              className={`flex w-40 shrink-0 flex-col gap-1 rounded-2xl p-4 text-left ring-2 transition md:w-auto ${v.tone} ${valueChain === v.id ? 'ring-brand-700' : 'ring-transparent'}`}
            >
              <span className="text-3xl">{v.emoji}</span>
              <span className="font-semibold">{v.name}</span>
              <span className="line-clamp-2 text-xs opacity-80">{v.description}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="mb-6">
        <FilterBar
          country={country}
          valueChain={valueChain}
          onCountry={(c) => set('pais', c)}
          onValueChain={(v) => set('cadena', v)}
          onClear={clear}
          active={active}
        />
      </div>

      <CardGrid>
        {error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : loading ? (
          <GridSkeleton />
        ) : data?.length ? (
          data.map((t) => <TerritoryCard key={t.id} territory={t} />)
        ) : (
          <EmptyState title="No hay territorios con esos filtros" />
        )}
      </CardGrid>
    </>
  );
}
