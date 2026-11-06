/** Interruptor central: cambiar VITE_USE_MOCKS=false para consumir el backend real. */
export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false';
export const API_URL = import.meta.env.VITE_API_URL ?? '/api';
