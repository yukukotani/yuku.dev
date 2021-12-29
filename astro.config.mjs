export default {
  buildOptions: {
    site: 'https://yuku.dev',
    sitemap: true,
  },
  renderers: ['@astrojs/renderer-preact'],
  markdownOptions: {
    render: [
      '@astrojs/markdown-remark',
      {
        remarkPlugins: ['remark-gfm', ['remark-external-links', { rel: ['noopener'] }]],
      },
    ],
  },
};
