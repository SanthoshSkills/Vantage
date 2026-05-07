import { analyzeSentiment } from '../utils/sentimentAnalyzer';
import { rankByVelocity } from '../utils/heatRanker';

const NEWS_CACHE_KEY = 'vantage_news_cache';
const NEWS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch and parse an RSS feed using a free CORS proxy.
 * Zero API keys required.
 */
const fetchRSS = async (rssUrl, scope) => {
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;
  try {
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) return [];
    
    const data = await res.json();
    if (!data.contents) return [];

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, "text/xml");
    const items = xmlDoc.querySelectorAll("item");
    
    const articles = [];
    items.forEach((item, index) => {
      // Only take top 5 from each feed to maintain velocity
      if (index >= 5) return;
      
      const title = item.querySelector("title")?.textContent || '';
      const pubDate = item.querySelector("pubDate")?.textContent || new Date().toISOString();
      const link = item.querySelector("link")?.textContent || '#';
      const source = item.querySelector("source")?.textContent || 'RSS Feed';
      
      if (title) {
        articles.push({
          title,
          publishedAt: pubDate,
          source,
          url: link,
          scope,
        });
      }
    });
    
    return articles;
  } catch (e) {
    console.error(`Vantage RSS Error (${scope}):`, e);
    return [];
  }
};

/**
 * Process raw articles into ranked, sentiment-scored feed items.
 */
const processArticles = (articles) => {
  const processed = articles
    .filter(a => a.title && a.title.length > 10)
    .map(item => {
      const sentiment = analyzeSentiment(item.title);
      return {
        ...item,
        ...sentiment,
      };
    });

  return rankByVelocity(processed);
};

/**
 * Main entry: fetch news from open RSS feeds with cache fallback.
 */
export const fetchNews = async (city, country) => {
  // Check cache
  const cached = localStorage.getItem(NEWS_CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < NEWS_CACHE_TTL) {
      return { news: data, source: 'CACHED' };
    }
  }

  // Define RSS endpoints (Google News)
  const globalRssUrl = `https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en`;
  const localRssUrl = `https://news.google.com/rss/headlines/section/geo/${encodeURIComponent(city)}?hl=en&gl=${country || 'US'}&ceid=${country || 'US'}:en`;

  // Fetch concurrently
  const [globalArticles, localArticles] = await Promise.all([
    fetchRSS(globalRssUrl, 'GLOBAL'),
    fetchRSS(localRssUrl, 'LOCAL')
  ]);

  const combinedArticles = [...localArticles, ...globalArticles];

  // If we got real articles, process and cache them
  if (combinedArticles.length > 0) {
    const ranked = processArticles(combinedArticles);
    localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({ data: ranked, timestamp: Date.now() }));
    return { news: ranked, source: 'LIVE' };
  }

  // Final fallback: return cache even if stale
  if (cached) {
    const { data } = JSON.parse(cached);
    return { news: data, source: 'STALE' };
  }

  // No cache, no APIs — return empty
  return { news: [], source: 'OFFLINE' };
};
