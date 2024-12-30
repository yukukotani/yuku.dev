import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://yuku.dev',
  integrations: [preact()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: ['remark-gfm', 'remark-math'],
    rehypePlugins: ['rehype-katex', ['rehype-external-links', { rel: ['noopener'], target: '_blank' }]],
  },
});
