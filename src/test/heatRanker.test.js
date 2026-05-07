import { describe, it, expect } from 'vitest';
import { rankByVelocity } from '../utils/heatRanker';

describe('Heat-Ranking Algorithm', () => {
  it('should rank newer items higher than older items with same social weight', () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const items = [
      { title: 'Older', publishedAt: oneHourAgo.toISOString(), socialWeight: 50 },
      { title: 'Newer', publishedAt: now.toISOString(), socialWeight: 50 }
    ];
    
    const ranked = rankByVelocity(items);
    expect(ranked[0].title).toBe('Newer');
  });

  it('should prioritize social weight for items with similar timing', () => {
    const now = new Date();
    const items = [
      { title: 'Low Social', publishedAt: now.toISOString(), socialWeight: 10 },
      { title: 'High Social', publishedAt: now.toISOString(), socialWeight: 90 }
    ];
    
    const ranked = rankByVelocity(items);
    expect(ranked[0].title).toBe('High Social');
  });

  it('should handle missing publishedAt by using current time', () => {
    const items = [
      { title: 'No Date', socialWeight: 50 }
    ];
    const ranked = rankByVelocity(items);
    expect(ranked[0].velocity).toBeDefined();
  });
});
