import { useState, useEffect } from 'react';
import { rankByVelocity } from '../utils/heatRanker';
import { analyzeSentiment } from '../utils/sentimentAnalyzer';

const LOCAL_STORAGE_KEY = 'vantage_cache';

export const useVantageData = () => {
  const [data, setData] = useState({
    city: 'Detecting...',
    country: '',
    news: [],
    marketIndices: [],
    loading: true,
    lastVisit: localStorage.getItem('last_visit_timestamp')
  });

  const fetchGeo = async () => {
    try {
      const res = await fetch('http://ip-api.com/json');
      const geo = await res.json();
      return { city: geo.city, country: geo.country };
    } catch (e) {
      return { city: 'Global', country: 'Intelligence' };
    }
  };

  const fetchNews = async (city) => {
    // Simulated news fetch - In a real scenario, use GNews or NewsData.io
    // Falling back to cache if needed
    try {
      // Mocking high-density data feed
      const mockNews = [
        { title: `Tech surge in ${city} drives market peak`, publishedAt: new Date().toISOString() },
        { title: "S&P 500 hits record high amid inflation cooling", publishedAt: new Date().toISOString() },
        { title: "Global supply chain stabilization expected by Q3", publishedAt: new Date().toISOString() },
        { title: "Energy sector faces volatility as new regulations loom", publishedAt: new Date().toISOString() },
        { title: "AI regulation debate intensifies in legislative halls", publishedAt: new Date().toISOString() },
        { title: `${city} infrastructure project receives green light`, publishedAt: new Date().toISOString() },
      ].map(item => ({
        ...item,
        ...analyzeSentiment(item.title)
      }));

      const ranked = rankByVelocity(mockNews);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ranked));
      return ranked;
    } catch (e) {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      return cached ? JSON.parse(cached) : [];
    }
  };

  const fetchMarkets = () => {
    return [
      { name: 'S&P 500', value: '5,243.20', delta: '+1.2%', trend: 'up' },
      { name: 'NASDAQ', value: '16,401.84', delta: '+1.5%', trend: 'up' },
      { name: 'FTSE 100', value: '7,930.92', delta: '-0.3%', trend: 'down' },
      { name: 'DAX', value: '18,175.11', delta: '+0.1%', trend: 'up' },
      { name: 'NIKKEI 225', value: '40,414.12', delta: '+2.0%', trend: 'up' },
      { name: 'NIFTY 50', value: '22,011.95', delta: '-0.5%', trend: 'down' },
      { name: 'HANG SENG', value: '16,473.64', delta: '-1.1%', trend: 'down' },
    ];
  };

  useEffect(() => {
    const init = async () => {
      const geo = await fetchGeo();
      const news = await fetchNews(geo.city);
      const markets = fetchMarkets();
      
      setData(prev => ({
        ...prev,
        ...geo,
        news,
        marketIndices: markets,
        loading: false
      }));

      // Update last visit timestamp
      localStorage.setItem('last_visit_timestamp', new Date().toISOString());
    };

    init();
  }, []);

  return data;
};
