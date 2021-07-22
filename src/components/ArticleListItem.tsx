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
  const isZenn = useMemo(() => article.source === 'zenn', []);

  return (
    <article class={styles.article}>
      <div class={styles.attribute}>
        <span class={styles.date}>{formattedDate}</span>
        {isZenn && (
          <span className={styles.zenn}>
            <ZennIcon height="12" />
          </span>
        )}
      </div>
      <a href={article.url} target={isZenn ? '_blank' : undefined} rel={isZenn ? 'noopener' : undefined}>
        <span class={styles.title}>{article.title}</span>
      </a>
    </article>
  );
};
