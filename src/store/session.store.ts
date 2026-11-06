import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Role } from '@/types';

interface SessionState {
  role: Role;
  userName: string;
  setRole: (role: Role) => void;
}

/** Sesión simulada: el rol cambia la navegación y los permisos de la UI. */
export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      role: 'visitante',
      userName: 'Invitado',
      setRole: (role) => set({ role, userName: DEMO_USERS[role] }),
    }),
    { name: 'coderhn-session', storage: createJSONStorage(() => localStorage) },
  ),
);

const DEMO_USERS: Record<Role, string> = {
  admin: 'Admin CoderHN',
  promotor: 'Promotora Ana López',
  productor: 'Productor José Pérez',
  visitante: 'Invitado',
};

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrador',
  promotor: 'Promotor digital',
  productor: 'Productor',
  visitante: 'Visitante',
};

export const can = {
  publish: (r: Role) => r !== 'visitante',
  moderate: (r: Role) => r === 'admin' || r === 'promotor',
  validateActors: (r: Role) => r === 'admin',
};
