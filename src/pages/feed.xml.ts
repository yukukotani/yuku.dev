import rss from '@astrojs/rss';

const rawInternalArticles = Object.values(import.meta.globEager('./articles/**/*.md'));
const internalArticles: Parameters<typeof rss>[0]['items'] = rawInternalArticles.map((article) => ({
  pubDate: new Date(article.frontmatter.publishDate),
  title: article.frontmatter.title,
  link: article.url,
}));
const sortedArticles = internalArticles.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

export const get = () => {
  return rss({
    title: 'こたにゆうくのブログ',
    description: 'こたにゆうくのブログ',
    site: import.meta.env.SITE,
    items: sortedArticles,
    customData: `<language>ja-jp</language>`,
  });
};
