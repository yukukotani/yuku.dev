import styles from "../../styles/Article.module.css";

import { promises as fs } from "fs";
import path from "path";

import Head from "next/head";

import remark from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtract from "remark-extract-frontmatter";
import remarkPrism from "remark-prism";
import remarkExternalLink from "remark-external-links";
import { parse } from "yaml";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo-yuku-fork";

const ARTICLE_DIR = path.join(process.cwd(), "articles");

const markdownProcessor = remark()
  .use(remarkParse)
  .use(remarkHtml)
  .use(remarkFrontmatter, { type: "yaml", marker: "+" })
  .use(remarkExtract, { yaml: parse })
  .use(remarkPrism)
  .use(remarkExternalLink, { rel: ["noopener"] });

export async function getStaticPaths() {
  const dir = await fs.readdir(ARTICLE_DIR);
  const paths = dir.map((filename) => {
    return {
      params: {
        slug: path.parse(filename).name,
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const rawMarkdown = await fs.readFile(
    path.join(ARTICLE_DIR, `${slug}.mdx`),
    "utf-8"
  );
  const processed = await markdownProcessor.process(rawMarkdown);

  return {
    props: { title: processed.data.title, contentHtml: processed.toString() },
  };
}

export default function Article({ title, contentHtml }) {
  const router = useRouter();
  const url = `https://yuku.dev${router.asPath}`;
  return (
    <>
      <Head>
        <title>{title} | yuku\.dev</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="blog" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:site" content="@MonchiFC" />
      </Head>
      <NextSeo
        title={title}
        openGraph={{
          title: title,
        }}
      />
      <div className={`markdown-body ${styles.article}`}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      </div>
    </>
  );
}
