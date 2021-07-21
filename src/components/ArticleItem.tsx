import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './ArticleItem.module.scss';
import { format } from 'date-fns';
import { Article } from '../models/Article';

type Props = {
  article: Article;
};

const ArticleItem: FunctionalComponent<Props> = ({ article }) => {
  const formattedDate = useMemo(() => {
    return format(new Date(article.publishDate), 'yyyy-MM-dd');
  }, [article]);

  return (
    <article class={styles.article}>
      <div class={styles.date}>{formattedDate}</div>
      <a href={article.url}>
        <span class={styles.title}>{article.title}</span>
      </a>
    </article>
  );
};

export default ArticleItem;
