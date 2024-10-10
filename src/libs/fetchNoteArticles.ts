import { Article } from '../models/Article';
import fetch from 'node-fetch';
import { parseISO } from 'date-fns';

export async function fetchNoteArticles(): Promise<readonly Article[]> {
  const res = await fetch('https://note.com/api/v2/creators/yukukotani/contents?kind=note');
  const body: any = await res.json();

  return (body.data.contents as any[]).map((article) => ({
    source: 'note',
    publishDate: parseISO(article.publishAt),
    title: article.name,
    url: `https://note.com/yukukotani/n/${article.key}`,
  }));
}
