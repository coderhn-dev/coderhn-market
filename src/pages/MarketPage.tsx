import type { CountryCode, ValueChainId } from '@/types';
import { PlusCircle } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { CardGrid, PageHeader } from '@/components/ui/PageHeader';
import { FilterBar } from '@/components/ui/FilterBar';
import { EmptyState, ErrorState, GridSkeleton } from '@/components/ui/Feedback';
import { ProductCard } from '@/components/products/ProductCard';
import { useAsync } from '@/hooks/useAsync';
import { useQueryFilters } from '@/hooks/useQueryFilters';
import { productsService } from '@/services';

export default function MarketPage() {
  const { values, set, clear, active } = useQueryFilters(['q', 'pais', 'categoria'] as const);
  const country = values.pais as CountryCode | undefined;
  const category = values.categoria as ValueChainId | undefined;
  const { data, loading, error, reload } = useAsync(
    () => productsService.list({ search: values.q, country, category }),
    [values.q, country, category],
  );

  return (
    <>
      <PageHeader
        title="Mercado regional"
        subtitle="Vitrina de productos de la agricultura familiar. Precios indicativos: consulta directamente con el productor."
        action={
          <div className="hidden md:block">
            <ButtonLink to="/publicar" icon={<PlusCircle className="size-5" />}>
              Publicar producto
            </ButtonLink>
          </div>
        }
      />
      <div className="mb-6">
        <FilterBar
          search={values.q}
          country={country}
          valueChain={category}
          onSearch={(q) => set('q', q)}
          onCountry={(c) => set('pais', c)}
          onValueChain={(v) => set('categoria', v)}
          onClear={clear}
          active={active}
          searchPlaceholder="Buscar producto, productor o lugar…"
        />
      </div>
      {!loading && data && <p className="mb-3 text-sm text-stone-500">{data.length} productos</p>}
      <CardGrid dense>
        {error ? (
          <ErrorState error={error} onRetry={reload} />
        ) : loading ? (
          <GridSkeleton count={8} className="h-72" />
        ) : data?.length ? (
          data.map((p) => <ProductCard key={p.id} product={p} />)
        ) : (
          <EmptyState title="No hay productos con esos filtros">Prueba con otra cadena o país.</EmptyState>
        )}
      </CardGrid>
    </>
  );
}
