import { FunctionalComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';
import styles from './Article.module.scss';
import { format } from 'date-fns';
import clsx from 'clsx';

type Props = {
  title: string;
  publishDate: string;
};

const Article: FunctionalComponent<Props> = ({ title, publishDate, children }) => {
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

export default Article;
