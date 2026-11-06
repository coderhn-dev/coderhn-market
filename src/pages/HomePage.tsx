import { ArrowRight, BookOpen, Lightbulb, Map, PlusCircle, QrCode, Store, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '@/components/ui/Button';
import { CardGrid } from '@/components/ui/PageHeader';
import { GridSkeleton } from '@/components/ui/Feedback';
import { ProductCard } from '@/components/products/ProductCard';
import { useAsync } from '@/hooks/useAsync';
import { productsService } from '@/services';
import { VALUE_CHAINS } from '@/mocks/catalog';

const SECTIONS = [
  { to: '/territorios', title: 'Territorios y cadenas', text: 'Conoce los territorios y cadenas de valor priorizadas.', icon: Map },
  { to: '/directorio', title: 'Directorio de actores', text: 'Cooperativas, organizaciones y emprendimientos.', icon: Users },
  { to: '/mercado', title: 'Mercado regional', text: 'Productos de la agricultura familiar de la región.', icon: Store },
  { to: '/recursos', title: 'Recursos y formación', text: 'Guías, videos y aula virtual.', icon: BookOpen },
  { to: '/innovacion', title: 'Innovación rural', text: 'Ficha QR y publicación guiada.', icon: Lightbulb },
];

export default function HomePage() {
  const { data: products, loading } = useAsync(() => productsService.list(), []);

  return (
    <div className="space-y-10 md:space-y-14">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-900 px-5 py-8 text-white md:px-10 md:py-12 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-10">
        <div>
          <p className="text-sm font-medium text-brand-200">CoderHN Market · Prototipo de portafolio</p>
          <h1 className="mt-2 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
            Negocios e innovación para la agricultura familiar de Centroamérica
          </h1>
          <p className="mt-3 max-w-xl text-brand-100 md:text-lg">
            Conecta con compradores, publica tus productos en minutos y accede a formación desde tu celular.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/mercado" size="lg" className="bg-white !text-brand-900 hover:bg-brand-50" icon={<Store className="size-5" />}>
              Ver mercado
            </ButtonLink>
            <ButtonLink to="/publicar" size="lg" variant="ghost" className="!text-white ring-1 ring-white/40 hover:bg-white/10" icon={<PlusCircle className="size-5" />}>
              Publicar mi producto
            </ButtonLink>
          </div>
        </div>
        <div className="mt-8 hidden grid-cols-3 gap-3 lg:mt-0 lg:grid">
          {VALUE_CHAINS.map((v) => (
            <Link key={v.id} to={`/mercado?categoria=${v.id}`} className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 p-4 text-center hover:bg-white/20">
              <span className="text-4xl">{v.emoji}</span>
              <span className="text-sm font-medium">{v.name}</span>
            </Link>
          ))}
          <Link to="/innovacion" className="flex flex-col items-center gap-1 rounded-2xl bg-white/10 p-4 text-center hover:bg-white/20">
            <QrCode className="size-10" />
            <span className="text-sm font-medium">Ficha QR</span>
          </Link>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section>
        <h2 className="mb-4 text-xl font-bold">Explora CoderHN Market</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {SECTIONS.map(({ to, title, text, icon: Icon }) => (
            <Link key={to} to={to} className="flex flex-col gap-2 rounded-2xl bg-white p-4 ring-1 ring-stone-200 transition-shadow hover:shadow-md">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="size-6" />
              </span>
              <span className="font-semibold text-stone-900">{title}</span>
              <span className="hidden text-sm text-stone-500 sm:block">{text}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos recientes */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recién publicados</h2>
          <Link to="/mercado" className="flex items-center gap-1 text-sm font-semibold text-brand-700">
            Ver todo <ArrowRight className="size-4" />
          </Link>
        </div>
        <CardGrid dense>
          {loading ? <GridSkeleton count={4} className="h-72" /> : products?.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
        </CardGrid>
      </section>
    </div>
  );
}
