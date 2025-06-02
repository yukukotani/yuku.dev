import fetch from 'node-fetch';
import { parseISO } from 'date-fns';
import type { Article } from '../models/Article';

export async function fetchSpeakerDeckArticles(): Promise<Article[]> {
  const res = await fetch('https://speakerdeck.com/yukukotani.rss');
  const xmlText = await res.text();
  
  // Simple RSS parsing using regex (for basic implementation)
  // In production, consider using an RSS parser library
  const items = xmlText.match(/<item>[\s\S]*?<\/item>/g) || [];
  
  return items.map((item) => {
    // Extract title
    const titleMatch = item.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    
    // Extract link
    const linkMatch = item.match(/<link>([^<]+)<\/link>/);
    const url = linkMatch ? linkMatch[1].trim() : '';
    
    // Extract pubDate
    const pubDateMatch = item.match(/<pubDate>([^<]+)<\/pubDate>/);
    const pubDateStr = pubDateMatch ? pubDateMatch[1].trim() : '';
    const publishDate = new Date(pubDateStr);
    
    return {
      source: 'speakerdeck' as const,
      publishDate,
      url,
      title,
    };
  });
}