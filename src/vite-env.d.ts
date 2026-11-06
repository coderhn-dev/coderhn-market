/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/react" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCKS?: string;
  readonly VITE_API_URL?: string;
  readonly VITE_DEMO_MODE?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
