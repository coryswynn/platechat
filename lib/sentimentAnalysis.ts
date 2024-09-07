const positiveWords = ['good', 'great', 'excellent', 'awesome', 'amazing', 'wonderful', 'fantastic', 'helpful', 'kind', 'polite'];
const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'rude', 'dangerous', 'aggressive', 'careless', 'inconsiderate', 'unsafe', 'failed'];

export function analyzeSentiment(text: string): 'positive' | 'negative' | 'neutral' {
  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}