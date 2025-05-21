import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import { Article } from '../models/Article';

export async function fetchSpeakerdeckSlides(): Promise<readonly Article[]> {
  const res = await fetch('https://speakerdeck.com/yukukotani.rss');
  const xml = await res.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);

  // According to RSS structure: parsed.rss.channel.item is array
  const items = parsed?.rss?.channel?.item ?? [];
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item: any) => ({
    source: 'speakerdeck',
    publishDate: new Date(item.pubDate),
    title: item.title,
    url: item.link,
  }));
}
