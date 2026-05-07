import { analyzeSentiment } from '../utils/sentimentAnalyzer';
import { rankByVelocity } from '../utils/heatRanker';

const NEWS_CACHE_KEY = 'vantage_news_cache';
const NEWS_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch news from GNews API (free tier: 100 req/day).
 * Requires VITE_GNEWS_API_KEY in .env
 */
const fetchGNews = async (city, country) => {
  const key = import.meta.env.VITE_GNEWS_API_KEY;
  if (!key) return null;

  const [globalRes, localRes] = await Promise.allSettled([
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&max=10&token=${key}`, { signal: AbortSignal.timeout(8000) }),
    fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(city)}&lang=en&max=5&token=${key}`, { signal: AbortSignal.timeout(8000) }),
  ]);

  const articles = [];

  if (globalRes.status === 'fulfilled' && globalRes.value.ok) {
    const data = await globalRes.value.json();
    if (data.articles) articles.push(...data.articles.map(a => ({ ...a, scope: 'GLOBAL' })));
  }

  if (localRes.status === 'fulfilled' && localRes.value.ok) {
    const data = await localRes.value.json();
    if (data.articles) articles.push(...data.articles.map(a => ({ ...a, scope: 'LOCAL' })));
  }

  if (articles.length === 0) return null;
  return articles;
};

/**
 * Fetch news from NewsData.io (free tier: 200 credits/day).
 * Requires VITE_NEWSDATA_API_KEY in .env
 */
const fetchNewsData = async (country) => {
  const key = import.meta.env.VITE_NEWSDATA_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${key}&language=en&size=10`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.results) return null;
    return data.results.map(a => ({
      title: a.title,
      publishedAt: a.pubDate,
      source: a.source_name,
      url: a.link,
      scope: (a.country && a.country.includes(country)) ? 'LOCAL' : 'GLOBAL',
    }));
  } catch {
    return null;
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
        title: item.title,
        publishedAt: item.publishedAt || item.pubDate || new Date().toISOString(),
        source: item.source?.name || item.source || 'Wire',
        url: item.url || '#',
        scope: item.scope || 'GLOBAL',
        ...sentiment,
      };
    });

  return rankByVelocity(processed);
};

/**
 * Main entry: fetch news from available APIs with cache fallback.
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

  // Try GNews first
  let articles = await fetchGNews(city, country);

  // Fallback to NewsData.io
  if (!articles) {
    articles = await fetchNewsData(country);
  }

  // If we got real articles, process and cache them
  if (articles && articles.length > 0) {
    const ranked = processArticles(articles);
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
