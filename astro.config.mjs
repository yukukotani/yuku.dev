export default {
  buildOptions: {
    site: 'https://yuku.dev',
    sitemap: true,
  },
  renderers: ['@astrojs/renderer-preact'],
  markdownOptions: {
    remarkPlugins: ['remark-gfm', ['remark-external-links', { rel: ['noopener'] }]],
  },
};
