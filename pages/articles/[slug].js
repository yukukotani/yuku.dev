import { promises as fs } from "fs";
import path from "path";

import remark from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const ARTICLE_DIR = path.join(process.cwd(), "articles");

export async function getStaticPaths() {
  const dir = await fs.readdir(ARTICLE_DIR);
  const paths = dir.map((filename) => {
    return {
      params: {
        slug: path.parse(filename).name,
      },
    };
  });
  console.log(paths);
  return { paths, fallback: false };
}

// ルーティングの情報が入ったparamsを受け取る
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const content = await fs.readFile(
    path.join(ARTICLE_DIR, `${slug}.mdx`),
    "utf-8"
  );

  return { props: { content } };
}

export default function Article({ content }) {
  const md = remark()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(content)
    .toString();
  return <div dangerouslySetInnerHTML={{ __html: md }}></div>;
}
