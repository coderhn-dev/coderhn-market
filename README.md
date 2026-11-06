# CoderHN Market – Negocios e Innovación Rural

> **Prototipo demostrativo · Portafolio de CoderHN.**
> Mockup funcional de pantallas y flujos; todos los datos (organizaciones, productos, teléfonos, precios) son ficticios.
> No está afiliado a ningún organismo público o regional.

Marketplace PWA *mobile-first* para la agricultura familiar de Centroamérica y República Dominicana: vitrina de productos con contacto por WhatsApp, directorio de actores, centro de formación, ficha QR de trazabilidad y un asistente de publicación para personas con baja alfabetización digital.

Stack: **Bun** · React 18 · TypeScript · Vite · Tailwind CSS v4 · Zustand · React Router v6 · vite-plugin-pwa · lucide-react · qrcode.react.

## Qué demuestra este proyecto

- **PWA instalable y offline-first** pensada para conectividad rural (service worker, caché por estrategia, aviso de actualización).
- **Diseño adaptativo real**: barra inferior en móvil, riel lateral en tablet, barra lateral completa en escritorio.
- **Arquitectura desacoplada**: la UI consume servicios tipados; los mocks se reemplazan por un backend REST cambiando una variable de entorno.
- **UX inclusiva**: asistente de 5 pasos con botones grandes, íconos y borrador persistente.
- **Roles simulados** (Administrador, Promotor, Productor, Visitante) con flujo de moderación.

## Modo demo

Con `VITE_DEMO_MODE=true` (por defecto):
- Se muestra la franja "Prototipo demostrativo · Portafolio CoderHN · Datos ficticios".
- Los botones de WhatsApp abren `wa.me` con el mensaje prellenado **sin número de destino**, para no escribir a teléfonos reales; el usuario elige el contacto.
- Las acciones (publicar, aprobar, validar) se guardan solo en el navegador; el panel tiene un botón para restablecer los datos.

## Uso

```bash
bun install
cp .env.example .env     # VITE_USE_MOCKS=true y VITE_DEMO_MODE=true por defecto
bun run dev              # http://localhost:5173 (expuesto en la red local para probar en el celular)
bun run build            # typecheck + build de producción con service worker
bun run preview          # sirve dist/ (el SW solo se registra en build/preview)
```

> `bun run dev:bun` fuerza el runtime de Bun para Vite; requiere Bun ≥ 1.2 (`bun upgrade`).

## Estructura

```
src/
├── types/            Interfaces de dominio (contrato UI ↔ backend)
├── mocks/            Datos semilla ficticios: países, cadenas, territorios, actores, productos, recursos
├── services/         Capa API: cada servicio tiene implementación mock y HTTP (Axios)
│   ├── config.ts       VITE_USE_MOCKS / VITE_API_URL
│   ├── http.ts         Instancia Axios + interceptor de token
│   ├── mockDb.ts       BD en memoria persistida en localStorage (modo demo)
│   └── *.service.ts    products, actors, territories, resources, dashboard
├── store/            Zustand: sesión/rol simulado, borrador del asistente, UI
├── hooks/            useAsync, useQueryFilters (filtros en URL), useOnline, useInstallPrompt
├── utils/            whatsapp (wa.me), formato, compresión de imágenes
├── components/
│   ├── ui/             Button, Badge, Chip, FilterBar, Modal, PageHeader/CardGrid, Feedback
│   ├── layout/         AppShell, TopBar, Sidebar (tablet/escritorio), BottomNav + MobileMenu (móvil)
│   ├── products/       ProductCard, ProductImage, WhatsAppButton
│   └── actors/ territories/ qr/ pwa/
├── pages/            Una página por ruta (cargadas con lazy())
│   ├── publish/        Asistente guiado de 5 pasos
│   └── admin/          Dashboard, moderación, validación de actores
└── router/           Rutas + RoleGuard
```

## Rutas

| Ruta | Sección | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/territorios` | Territorios y cadenas de valor (filtros país/cadena) | Público |
| `/directorio`, `/directorio/:id` | Directorio de actores + perfil con estado de validación | Público |
| `/mercado`, `/mercado/:id` | Vitrina de productos + "Consultar por WhatsApp" + Ficha QR | Público |
| `/recursos` | Repositorio de materiales y aula virtual | Público |
| `/innovacion` | Las 2 innovaciones: Ficha QR y Asistente | Público |
| `/publicar` | Asistente guiado (5 pasos) | Productor, Promotor, Admin |
| `/ficha/:id` | Ficha pública de trazabilidad (destino del QR, sin navegación) | Público |
| `/admin`, `/admin/moderacion` | Dashboard y moderación de publicaciones | Promotor, Admin |
| `/admin/actores` | Validación de actores | Admin |

El rol se cambia con el selector de la barra superior (simulado, persistido en localStorage).

## Diseño adaptativo

- **Móvil (< 768px):** barra inferior con botón central "Publicar", menú "Más" en hoja inferior, filtros en carrusel horizontal, acciones principales fijas al alcance del pulgar, `safe-area-inset` para notch.
- **Tablet (≥ 768px):** riel lateral de iconos, rejillas de 2–3 columnas, filtros envueltos.
- **Escritorio / pantalla completa (≥ 1024px):** barra lateral completa, rejillas de 4–5 columnas, contenido limitado a `max-w-screen-2xl`.

## PWA y baja conectividad

- Precache del shell + rutas divididas por código; `CacheFirst` para imágenes y `NetworkFirst` (timeout 5 s) para `/api/*`.
- Aviso de nueva versión y de "lista sin conexión"; banner cuando no hay red; botón propio de instalación.
- Fuente del sistema (sin descargas de fuentes), placeholders de producto sin imagen (0 KB), fotos comprimidas en el teléfono (~100 KB) antes de subir.
- El borrador del asistente se guarda localmente: si se cae la señal, se retoma donde quedó.
- Filtros en la URL: se pueden compartir por WhatsApp.

## Conectar el backend

Cambiar `VITE_USE_MOCKS=false`, `VITE_DEMO_MODE=false` y definir `VITE_API_URL`. La UI no cambia: cada `*.service.ts` ya tiene la implementación `api` con los endpoints REST esperados (`GET /products`, `PATCH /products/:id/status`, `GET /actors`, `PATCH /actors/:id/validation`, `GET /territories`, `GET /resources`, `GET /courses`, `GET /dashboard/stats`).

## Despliegue

`netlify.toml` + `.github/workflows/deploy.yml`: producción en cada push a `main` y vista previa por PR. Requiere los secretos `NETLIFY_AUTH_TOKEN` y `NETLIFY_SITE_ID` en GitHub.

---

Desarrollado por **CoderHN**.
