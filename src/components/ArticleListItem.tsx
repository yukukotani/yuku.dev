import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './ArticleListItem.module.scss';
import { format } from 'date-fns';
import { Article } from '../models/Article';
import { ZennIcon } from './ZennIcon';

type Props = {
  article: Article;
};

export const ArticleListItem: FunctionalComponent<Props> = ({ article }) => {
  const formattedDate = useMemo(() => {
    return format(new Date(article.publishDate), 'yyyy-MM-dd');
  }, [article]);

  return (
    <article class={styles.article}>
      <div>
        <span class={styles.date}>{formattedDate}</span>
        {article.source === 'zenn' && (
          <span class={styles.zenn}>
            <ZennIcon height="10" className={styles.icon} />
            Zenn
          </span>
        )}
      </div>
      <a href={article.url} target={article.source === 'zenn' ? '_blank' : undefined} rel="noopener">
        <span class={styles.title}>{article.title}</span>
      </a>
    </article>
  );
};
