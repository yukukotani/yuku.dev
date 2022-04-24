import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  build: {
    site: 'https://yuku.dev',
    sitemap: true,
  },
  integrations: [preact()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: ['remark-gfm', ['remark-external-links', { rel: ['noopener'] }]],
  },
});
