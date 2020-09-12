import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>yuku.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          yuku.dev
        </h1>

        <p className={styles.description}>
          こたにゆうくのページです
        </p>

        <div className={styles.articles}>
          <div className={styles.article}>
            <div>2020-09-13</div>
            <div className={styles.articleTitle}>
              <a href="google.com">
                これはタイトルタイタイタイタイタイトル
              </a>
            </div>
          </div>
          <div className={styles.article}>
            <div>2020-09-13</div>
            <div className={styles.articleTitle}>
              <a href="google.com">
                これはタイトルタイタイタイタイタイトル
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        COPYRIGHT YUKU KOTANI
      </footer>
    </div>
  );
}
