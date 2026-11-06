/** Interruptor central: cambiar VITE_USE_MOCKS=false para consumir el backend real. */
export const USE_MOCKS = (import.meta.env.VITE_USE_MOCKS ?? 'true') !== 'false';
/**
 * Modo demostración (portafolio): muestra el aviso de prototipo y abre WhatsApp
 * sin número de destino, para no enviar mensajes a teléfonos reales.
 */
export const DEMO_MODE = (import.meta.env.VITE_DEMO_MODE ?? 'true') !== 'false';
export const API_URL = import.meta.env.VITE_API_URL ?? '/api';
