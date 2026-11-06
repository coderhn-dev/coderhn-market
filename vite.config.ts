import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icons/favicon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'CoderHN Market – Negocios e Innovación Rural',
        short_name: 'CoderHN Market',
        description:
          'Prototipo demostrativo de CoderHN: plataforma de negocios, formación e innovación rural para la agricultura familiar de Centroamérica y República Dominicana.',
        lang: 'es',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
        orientation: 'any',
        theme_color: '#166534',
        background_color: '#f7f7f2',
        categories: ['business', 'education', 'food'],
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: [
          { name: 'Mercado Regional', url: '/mercado', icons: [{ src: 'icons/pwa-192.png', sizes: '192x192' }] },
          { name: 'Publicar producto', url: '/publicar', icons: [{ src: 'icons/pwa-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        runtimeCaching: [
          {
            // Imágenes remotas de productos: cache-first para ahorrar datos móviles
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // API futura: network-first con fallback a caché cuando no hay señal
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  server: { host: true, port: 5173 },
});
