/**
 * Ranks news items based on velocity (recency + simulated social weight).
 * @param {Array} newsItems 
 * @returns {Array}
 */
export const rankByVelocity = (newsItems) => {
  return newsItems
    .map(item => {
      // Simulate velocity: 
      // 1. Time weight (exponential decay)
      // 2. Random social weight (simulating viral factor)
      const publishedAt = new Date(item.publishedAt || Date.now());
      const ageInHours = (new Date() - publishedAt) / (1000 * 60 * 60);
      const recencyScore = Math.max(0, 100 - (ageInHours * 5));
      
      // Simulated social volume (0-100)
      const socialWeight = item.socialWeight || Math.floor(Math.random() * 100);
      
      const velocity = (recencyScore * 0.4) + (socialWeight * 0.6);
      
      return { ...item, velocity: velocity.toFixed(1) };
    })
    .sort((a, b) => b.velocity - a.velocity);
};
