type ArticleSource = 'internal' | 'zenn';

export type Article = {
  source: ArticleSource;
  publishDate: Date;
  url: string;
  title: string;
};
