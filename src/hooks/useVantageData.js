import { useState, useEffect } from 'react';
import { fetchMarketData } from '../services/marketService';
import { fetchNews } from '../services/newsService';

export const useVantageData = () => {
  const [data, setData] = useState({
    city: 'Detecting...',
    country: '',
    news: [],
    marketIndices: [],
    loading: true,
    lastVisit: localStorage.getItem('last_visit_timestamp'),
    newsSource: 'INIT',
    marketSource: 'INIT',
  });

  useEffect(() => {
    const init = async () => {
      // 1. Geo detection (real — ip-api.com, no key needed)
      let city = 'Global';
      let country = 'US';
      try {
        const geoRes = await fetch('http://ip-api.com/json', { signal: AbortSignal.timeout(5000) });
        const geo = await geoRes.json();
        if (geo.status === 'success') {
          city = geo.city;
          country = geo.countryCode || geo.country;
        }
      } catch {
        // Silent fallback
      }

      // 2. Market data (real — Yahoo Finance via proxy)
      const { indices, source: marketSource } = await fetchMarketData();

      // 3. News (real — GNews/NewsData.io with cache fallback)
      const { news, source: newsSource } = await fetchNews(city, country);

      setData({
        city,
        country,
        news,
        marketIndices: indices,
        loading: false,
        lastVisit: localStorage.getItem('last_visit_timestamp'),
        newsSource,
        marketSource,
      });

      localStorage.setItem('last_visit_timestamp', new Date().toISOString());
    };

    init();
  }, []);

  return data;
};
