type ArticleSource = 'internal' | 'zenn' | 'note' | 'speakerdeck';

export type Article = {
  source: ArticleSource;
  publishDate: Date;
  url: string;
  title: string;
};
