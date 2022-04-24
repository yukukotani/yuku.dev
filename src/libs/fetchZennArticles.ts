import { Article } from './../models/Article';
import fetch from 'node-fetch';
import { parseISO } from 'date-fns';

export async function fetchYukuZennArticles(): Promise<readonly Article[]> {
  const res = await fetch('https://zenn.dev/api/articles?username=yuku&count=100&order=latest');
  const body = await res.json();

  return (body.articles as any[]).map((article) => ({
    source: 'zenn',
    publishDate: parseISO(article.published_at),
    title: article.title,
    url: `https://zenn.dev/${article.user.username}/articles/${article.slug}`,
  }));
}

const ubieZennSlugs: string[] = ['firebase-auth-hack', 'oss-donation'];

export async function fetchUbieZennArticles(): Promise<readonly Article[]> {
  const res = await fetch('https://zenn.dev/api/articles?username=ubie&count=100&order=latest');
  const body = await res.json();

  return (body.articles as any[])
    .filter((article) => ubieZennSlugs.includes(article.slug))
    .map((article) => ({
      source: 'zenn',
      publishDate: parseISO(article.published_at),
      title: article.title,
      url: `https://zenn.dev/${article.user.username}/articles/${article.slug}`,
    }));
}
