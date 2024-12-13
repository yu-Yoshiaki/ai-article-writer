export interface Section {
  id: string;
  title: string;
  content: string;
  variations: string[];
  selectedVariation: number;
}

export interface Article {
  theme: string;
  sections: Section[];
  tone?: ArticleTone;
  seoScore?: SeoScore;
}

export type ArticleTone = 'formal' | 'casual' | 'professional' | 'friendly' | 'technical';

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  sections: Array<{
    title: string;
    description: string;
  }>;
}

export interface SeoScore {
  overall: number;
  keywords: Array<{
    word: string;
    relevance: number;
    frequency: number;
  }>;
  suggestions: string[];
}

export interface EditorHistory {
  past: Article[];
  present: Article;
  future: Article[];
}