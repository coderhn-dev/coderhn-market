import { useSession, ROLE_LABELS } from '@/store/session.store';
import { Logo } from './Logo';
import { RoleSwitcher } from './RoleSwitcher';

export function TopBar() {
  const userName = useSession((s) => s.userName);
  const role = useSession((s) => s.role);
  return (
    <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/90 pt-safe backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-3 px-4 md:px-6 lg:px-8">
        <div className="md:hidden">
          <Logo />
        </div>
        <p className="hidden text-sm text-stone-500 md:block">
          Hola, <span className="font-semibold text-stone-800">{userName}</span>
          <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-xs">{ROLE_LABELS[role]}</span>
        </p>
        <RoleSwitcher compact />
      </div>
    </header>
  );
}
