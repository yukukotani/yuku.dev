import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/App.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>yuku.dev</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/3.0.1/github-markdown.min.css"
        ></link>
      </Head>

      <header className={styles.header}>
        <div className={styles.icons}>
          <a href="https://github.com/Monchi">
            <img src="/github.png" />
          </a>
          <a href="https://twitter.com/MonchiFC">
            <img src="/twitter.png" />
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="/">yuku.dev</a>
        </h1>
        <p className={styles.description}>こたにゆうくのページです</p>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>COPYRIGHT YUKU KOTANI</footer>
    </div>
  );
}

export default MyApp;
