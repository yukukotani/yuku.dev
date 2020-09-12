import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.articles}>
      <div className={styles.article}>
        <div>2020-09-13</div>
        <div className={styles.articleTitle}>
          <a href="google.com">これはタイトルタイタイタイタイタイトル</a>
        </div>
      </div>
      <div className={styles.article}>
        <div>2020-09-13</div>
        <div className={styles.articleTitle}>
          <a href="google.com">これはタイトルタイタイタイタイタイトル</a>
        </div>
      </div>
    </div>
  );
}
