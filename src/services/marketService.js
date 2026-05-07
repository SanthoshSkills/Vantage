const CACHE_KEY = 'vantage_market_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const SYMBOLS = [
  { symbol: '^GSPC', name: 'S&P 500' },
  { symbol: '^IXIC', name: 'NASDAQ' },
  { symbol: '^FTSE', name: 'FTSE 100' },
  { symbol: '^GDAXI', name: 'DAX' },
  { symbol: '^N225', name: 'NIKKEI 225' },
  { symbol: '^NSEI', name: 'NIFTY 50' },
  { symbol: '^HSI', name: 'HANG SENG' },
];

const fetchQuote = async (symbol) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  
  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  
  const data = await res.json();
  const meta = data.chart.result[0].meta;
  const price = meta.regularMarketPrice;
  const prevClose = meta.chartPreviousClose || meta.previousClose;
  const delta = prevClose ? ((price - prevClose) / prevClose * 100) : 0;
  const marketState = meta.currentTradingPeriod?.regular ? 
    (Date.now() / 1000 >= meta.currentTradingPeriod.regular.start && 
     Date.now() / 1000 <= meta.currentTradingPeriod.regular.end ? 'LIVE' : 'CLOSED') : 'UNKNOWN';
  
  return {
    price: price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    delta: `${delta >= 0 ? '+' : ''}${delta.toFixed(2)}%`,
    trend: delta >= 0 ? 'up' : 'down',
    raw: price,
    marketState,
  };
};

export const fetchMarketData = async () => {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return { indices: data, source: 'CACHED' };
    }
  }

  try {
    const results = await Promise.allSettled(
      SYMBOLS.map(async ({ symbol, name }) => {
        const quote = await fetchQuote(symbol);
        return { name, value: quote.price, delta: quote.delta, trend: quote.trend, marketState: quote.marketState };
      })
    );

    const indices = results.map((result, i) => {
      if (result.status === 'fulfilled') return result.value;
      // Fallback for individual failures — use cache if available
      if (cached) {
        const { data } = JSON.parse(cached);
        const cachedItem = data.find(d => d.name === SYMBOLS[i].name);
        if (cachedItem) return { ...cachedItem, marketState: 'STALE' };
      }
      return { name: SYMBOLS[i].name, value: '—', delta: '—', trend: 'up', marketState: 'OFFLINE' };
    });

    // Cache the successful result
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: indices, timestamp: Date.now() }));
    return { indices, source: 'LIVE' };
  } catch (e) {
    // Total failure — return cache or static
    if (cached) {
      const { data } = JSON.parse(cached);
      return { indices: data, source: 'CACHED' };
    }
    return { indices: SYMBOLS.map(s => ({ name: s.name, value: '—', delta: '—', trend: 'up', marketState: 'OFFLINE' })), source: 'OFFLINE' };
  }
};
