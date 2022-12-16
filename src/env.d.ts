/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SITE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv & Record<string, string>;
}
