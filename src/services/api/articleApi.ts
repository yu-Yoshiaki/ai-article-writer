import type { Article, Section, SeoScore } from "../../types";
import { mockArticleData } from "../../data/mockData";

export async function fetchArticleContent(theme: string): Promise<Article> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    theme,
    sections: mockArticleData,
  };
}

export async function regenerateVariations(
  _sectionId: string
): Promise<string[]> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    "Newly generated variation 1",
    "Newly generated variation 2",
    "Newly generated variation 3",
  ];
}

export async function generateNewSection(_theme: string): Promise<Section> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    id: "", // Will be replaced with generated ID
    title: "New Section",
    content: "",
    variations: [
      "This is the first variation of the new section.",
      "Here is another way to express this section's content.",
      "A third alternative for this section's content.",
    ],
    selectedVariation: 0,
    order: 0, // Will be updated when added to article
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function analyzeSeoScore(article: Article): Promise<SeoScore> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const text = article.sections
    .map((s) => s.variations[s.selectedVariation])
    .join(" ");

  const keywords = extractKeywords(text);

  return {
    overall: calculateOverallScore(keywords),
    keywords: keywords.map((k) => ({
      word: k.word,
      relevance: k.relevance,
      frequency: k.frequency,
    })),
    suggestions: generateSuggestions(keywords),
  };
}

function extractKeywords(
  text: string
): Array<{ word: string; relevance: number; frequency: number }> {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const frequency: { [key: string]: number } = {};

  words.forEach((word) => {
    if (word.length > 3) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  return Object.entries(frequency)
    .map(([word, freq]) => ({
      word,
      relevance: Math.random() * 100,
      frequency: freq,
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 5);
}

function calculateOverallScore(keywords: Array<{ relevance: number }>): number {
  const avgRelevance =
    keywords.reduce((sum, k) => sum + k.relevance, 0) / keywords.length;
  return Math.round(avgRelevance);
}

function generateSuggestions(
  keywords: Array<{ word: string; frequency: number }>
): string[] {
  const suggestions = [
    "Consider adding more specific keywords related to your topic",
    "Try to increase the frequency of your main keywords",
    "Add more descriptive headings to improve structure",
  ];

  if (keywords.length < 3) {
    suggestions.push("Add more relevant keywords to improve visibility");
  }

  return suggestions;
}
