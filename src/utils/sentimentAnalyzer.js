import Sentiment from 'sentiment';

const analyzer = new Sentiment();

/**
 * Analyzes text sentiment and returns a glow class.
 * @param {string} text 
 * @returns {{ score: number, class: string }}
 */
export const analyzeSentiment = (text) => {
  const result = analyzer.analyze(text);
  const score = result.score;
  
  if (score > 0) {
    return { score, class: 'emerald-glow' };
  } else if (score < 0) {
    return { score, class: 'rose-glow' };
  }
  
  return { score, class: 'text-white/80' };
};
