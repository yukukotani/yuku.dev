import { promises as fs } from "fs";
import path from "path";

import remark from "remark";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkFrontmatter from "remark-frontmatter";
import remarkExtract from "remark-extract-frontmatter";
import { parse } from "yaml";

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
    .use(remarkFrontmatter)
    .use(remarkExtract, { yaml: parse })
    .processSync(content);

  console.log(md);
  return (
    <div className="markdown-body">
      <h1>{md.data.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md.toString() }}></div>
    </div>
  );
}
