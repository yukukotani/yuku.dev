import { FunctionalComponent, h } from 'preact';
import { Article } from '../models/Article';
import ArticleItem from './ArticleItem';
import { useMemo } from 'preact/hooks';

type Props = {
  articles: readonly Article[];
};

const ArticleList: FunctionalComponent<Props> = ({ articles }) => {
  const sorted = useMemo(() => {
    return [...articles].sort((a, b) => {
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [articles]);

  return (
    <div>
      {sorted.map((article) => (
        <ArticleItem key={article.url} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
