import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Skeleton } from '@/components/ui/Feedback';
import { RoleGuard } from './RoleGuard';

// Code-splitting por ruta: el primer render en 3G descarga solo lo necesario.
const HomePage = lazy(() => import('@/pages/HomePage'));
const TerritoriesPage = lazy(() => import('@/pages/TerritoriesPage'));
const DirectoryPage = lazy(() => import('@/pages/DirectoryPage'));
const ActorDetailPage = lazy(() => import('@/pages/ActorDetailPage'));
const MarketPage = lazy(() => import('@/pages/MarketPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const ResourcesPage = lazy(() => import('@/pages/ResourcesPage'));
const InnovationPage = lazy(() => import('@/pages/InnovationPage'));
const PublishWizardPage = lazy(() => import('@/pages/publish/PublishWizardPage'));
const FichaPage = lazy(() => import('@/pages/FichaPage'));
const AdminLayout = lazy(() => import('@/pages/admin/AdminLayout'));
const DashboardPage = lazy(() => import('@/pages/admin/DashboardPage'));
const ModerationPage = lazy(() => import('@/pages/admin/ModerationPage'));
const ActorValidationPage = lazy(() => import('@/pages/admin/ActorValidationPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const page = (node: ReactNode) => <Suspense fallback={<Skeleton className="h-[60dvh]" />}>{node}</Suspense>;

export const router = createBrowserRouter([
  // Ficha pública del QR: sin el shell de navegación, carga mínima
  { path: '/ficha/:id', element: page(<FichaPage />) },
  {
    element: <AppShell />,
    children: [
      { index: true, element: page(<HomePage />) },
      { path: 'territorios', element: page(<TerritoriesPage />) },
      { path: 'directorio', element: page(<DirectoryPage />) },
      { path: 'directorio/:id', element: page(<ActorDetailPage />) },
      { path: 'mercado', element: page(<MarketPage />) },
      { path: 'mercado/:id', element: page(<ProductDetailPage />) },
      { path: 'recursos', element: page(<ResourcesPage />) },
      { path: 'innovacion', element: page(<InnovationPage />) },
      { path: 'publicar', element: page(<PublishWizardPage />) },
      {
        path: 'admin',
        element: page(
          <RoleGuard allow={['admin', 'promotor']}>
            <AdminLayout />
          </RoleGuard>,
        ),
        children: [
          { index: true, element: page(<DashboardPage />) },
          { path: 'moderacion', element: page(<ModerationPage />) },
          {
            path: 'actores',
            element: page(
              <RoleGuard allow={['admin']}>
                <ActorValidationPage />
              </RoleGuard>,
            ),
          },
        ],
      },
      { path: '*', element: page(<NotFoundPage />) },
    ],
  },
]);
