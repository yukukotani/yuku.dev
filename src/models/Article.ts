type ArticleSource = 'internal' | 'zenn' | 'note';

export type Article = {
  source: ArticleSource;
  publishDate: Date;
  url: string;
  title: string;
};
