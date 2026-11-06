import { ArrowLeft, Calendar, Mail, MapPin, MessageCircle, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ValidationBadge } from '@/components/ui/Badge';
import { ButtonAnchor } from '@/components/ui/Button';
import { CardGrid } from '@/components/ui/PageHeader';
import { EmptyState, GridSkeleton, Skeleton } from '@/components/ui/Feedback';
import { ProductCard } from '@/components/products/ProductCard';
import { ACTOR_TYPE_LABELS } from '@/components/actors/labels';
import { useAsync } from '@/hooks/useAsync';
import { actorsService, productsService } from '@/services';
import { getCountry, getValueChain } from '@/mocks/catalog';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export default function ActorDetailPage() {
  const { id = '' } = useParams();
  const { data: actor, loading } = useAsync(() => actorsService.getById(id), [id]);
  const { data: products, loading: loadingProducts } = useAsync(() => productsService.listByActor(id), [id]);

  if (loading) return <Skeleton className="h-96" />;
  if (!actor) return <EmptyState title="Perfil no encontrado" />;
  const country = getCountry(actor.country);

  return (
    <div className="space-y-8">
      <Link to="/directorio" className="inline-flex items-center gap-1 text-sm font-medium text-brand-700">
        <ArrowLeft className="size-4" /> Directorio
      </Link>

      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl bg-white p-5 ring-1 ring-stone-200 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="grid size-20 shrink-0 place-items-center rounded-3xl bg-brand-100 text-2xl font-bold text-brand-800">
              {actor.name.split(' ').slice(0, 2).map((w) => w[0]).join('')}
            </div>
            <div className="flex-1 space-y-2">
              <ValidationBadge status={actor.validationStatus} />
              <h1 className="text-2xl font-bold md:text-3xl">{actor.name}</h1>
              <p className="font-medium text-earth-700">{ACTOR_TYPE_LABELS[actor.type]}</p>
            </div>
          </div>
          <p className="mt-5 text-stone-700 md:text-lg">{actor.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {actor.valueChains.map((v) => {
              const c = getValueChain(v);
              return (
                <span key={v} className={`rounded-full px-3 py-1 text-sm font-medium ${c.tone}`}>
                  {c.emoji} {c.name}
                </span>
              );
            })}
          </div>
          {actor.validationStatus === 'en-revision' && (
            <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">
              Este perfil está siendo verificado por un promotor digital del territorio.
            </p>
          )}
        </div>

        <aside className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-stone-200 md:p-6">
          <h2 className="font-semibold">Información</h2>
          <ul className="space-y-3 text-sm text-stone-700">
            <li className="flex gap-2"><MapPin className="size-5 text-brand-700" /> {actor.location}, {country.flag} {country.name}</li>
            <li className="flex gap-2"><Users className="size-5 text-brand-700" /> {actor.members} miembros</li>
            <li className="flex gap-2"><Calendar className="size-5 text-brand-700" /> Desde {actor.foundedYear}</li>
            {actor.email && <li className="flex gap-2"><Mail className="size-5 text-brand-700" /> {actor.email}</li>}
          </ul>
          <ButtonAnchor
            href={buildWhatsAppLink(actor.whatsapp, `Hola ${actor.name}, los encontré en CoderHN Market y me gustaría conocer más.`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            block
            size="lg"
            icon={<MessageCircle className="size-5" />}
          >
            Contactar por WhatsApp
          </ButtonAnchor>
        </aside>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Productos</h2>
        <CardGrid dense>
          {loadingProducts ? (
            <GridSkeleton count={4} className="h-72" />
          ) : products?.length ? (
            products.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <EmptyState title="Aún no tiene productos publicados" />
          )}
        </CardGrid>
      </section>
    </div>
  );
}
