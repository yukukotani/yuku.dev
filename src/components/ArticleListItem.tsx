import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './ArticleListItem.module.scss';
import { format } from 'date-fns';
import { Article } from '../models/Article';
import { ZennIcon } from './ZennIcon';
import { NoteIcon } from './NoteIcon';

type Props = {
  article: Article;
};

export const ArticleListItem: FunctionalComponent<Props> = ({ article }) => {
  const formattedDate = useMemo(() => {
    return format(new Date(article.publishDate), 'yyyy-MM-dd');
  }, [article]);
  const isExternal = useMemo(() => article.source !== 'internal', []);

  return (
    <article class={styles.article}>
      <div class={styles.attribute}>
        <span class={styles.date}>{formattedDate}</span>
        {article.source === 'zenn' ? (
          <span className={styles.zenn}>
            <ZennIcon height="12" />
          </span>
        ) : article.source === 'note' ? (
          <span className={styles.note}>
            <NoteIcon height="20" />
          </span>
        ) : null}
      </div>
      <a href={article.url} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener' : undefined}>
        <span class={styles.title}>{article.title}</span>
      </a>
    </article>
  );
};
