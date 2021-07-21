import { FunctionalComponent, h } from 'preact';
import { Article } from '../models/Article';
import { ArticleListItem } from './ArticleListItem';
import { useMemo } from 'preact/hooks';

type Props = {
  articles: readonly Article[];
};

export const ArticleList: FunctionalComponent<Props> = ({ articles }) => {
  const sorted = useMemo(() => {
    return [...articles].sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [articles]);

  return (
    <div>
      {sorted.map((article) => (
        <ArticleListItem key={article.url} article={article} />
      ))}
    </div>
  );
};
