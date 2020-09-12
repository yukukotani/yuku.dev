import "../styles/globals.css";
import Head from "next/head";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>yuku.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>yuku.dev</h1>
        <p className={styles.description}>こたにゆうくのページです</p>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>COPYRIGHT YUKU KOTANI</footer>
    </div>
  );
}

export default MyApp;
