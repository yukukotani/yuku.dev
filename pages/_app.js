import "../styles/globals.css";
import "github-markdown-css";
import "prismjs/themes/prism.css";
import styles from "../styles/App.module.css";

import Head from "next/head";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as gtag from "../lib/gtag";
import { DefaultSeo } from "next-seo-yuku-fork";

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
      <DefaultSeo
        defaultTitle="Yuku Kotani"
        titleTemplate="%s | Yuku Kotani"
        description="こたにゆうくのブログです"
        openGraph={{
          site_name: "Yuku Kotani",
          title: "Yuku Kotani",
          description: "こたにゆうくのブログです",
          url: `https://yuku.dev${router.asPath}`,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
          site: "@MonchiFC",
        }}
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          <Link href="/">yuku.dev</Link>
        </h1>
        <p className={styles.description}>こたにゆうくのページです</p>
        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <div className={styles.icons}>
          <a target="_blank" href="https://github.com/Monchi">
            <img src="/github.png" />
          </a>
          <a target="_blank" href="https://twitter.com/MonchiFC">
            <img src="/twitter.png" />
          </a>
        </div>
        <div>
          COPYRIGHT YUKU KOTANI <br />
          This site uses Google Analytics.
        </div>
      </footer>
    </div>
  );
}

export default MyApp;
