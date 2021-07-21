import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './ArticleSection.module.scss';
import { format } from 'date-fns';

type Props = {
  title: string;
  publishDate: string;
};

export const ArticleSection: FunctionalComponent<Props> = ({ title, publishDate, children }) => {
  const formattedDate = useMemo(() => {
    return format(new Date(publishDate), 'yyyy-MM-dd');
  }, [publishDate]);
  return (
    <article>
      <div>
        <p className={styles.date}>{formattedDate}</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles['markdown-body']}>{children}</div>
    </article>
  );
};
