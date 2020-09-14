import { promises as fs } from "fs";
import path from "path";

import Head from "next/head";

import remark from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtract from "remark-extract-frontmatter";
import { parse } from "yaml";

const ARTICLE_DIR = path.join(process.cwd(), "articles");

const markdownProcessor = remark()
  .use(remarkParse)
  .use(remarkHtml)
  .use(remarkFrontmatter)
  .use(remarkExtract, { yaml: parse });

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
  return (
    <>
      <Head>
        <title>{title} | yuku.dev</title>
      </Head>
      <div className="markdown-body">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
      </div>
    </>
  );
}
