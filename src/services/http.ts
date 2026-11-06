import axios from 'axios';
import { API_URL } from './config';

/** Cliente HTTP único. Interceptores de auth/errores se agregan aquí. */
export const http = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('coderhn-token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    /* almacenamiento no disponible */
  }
  return config;
});
