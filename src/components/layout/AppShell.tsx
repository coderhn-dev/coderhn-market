import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { OfflineBanner } from '@/components/pwa/OfflineBanner';
import { ReloadPrompt } from '@/components/pwa/ReloadPrompt';
import { BottomNav } from './BottomNav';
import { MobileMenu } from './MobileMenu';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function AppShell() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <OfflineBanner />
        {/* pb-24 en móvil reserva espacio para la barra inferior */}
        <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 pt-5 pb-28 md:px-6 md:pt-8 md:pb-12 lg:px-8">
          <Outlet />
        </main>
      </div>
      <BottomNav />
      <MobileMenu />
      <ReloadPrompt />
    </div>
  );
}
