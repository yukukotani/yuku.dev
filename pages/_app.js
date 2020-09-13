import "../styles/globals.css";
import "github-markdown-css";

import Head from "next/head";
import styles from "../styles/App.module.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as gtag from "../lib/gtag";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={styles.container}>
      <Head>
        <title>yuku.dev</title>
        <link rel="icon" href="/favicon.ico" />
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
          <Link href="/">yuku.dev</Link>
        </h1>
        <p className={styles.description}>こたにゆうくのページです</p>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>COPYRIGHT YUKU KOTANI</footer>
    </div>
  );
}

export default MyApp;
