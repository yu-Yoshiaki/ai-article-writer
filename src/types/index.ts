export interface Section {
  id: string;
  title: string;
  content: string;
  variations: string[];
  selectedVariation: number;
  order: number;
  currentRevisionId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id?: string;
  theme: string;
  sections: Section[];
  tone?: ArticleTone;
  seoScore?: SeoScore;
}

export type ArticleTone =
  | "formal"
  | "casual"
  | "professional"
  | "friendly"
  | "technical";

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
  present: Article | null;
  future: Article[];
}

export interface Revision {
  id: string;
  sectionId: string;
  content: string;
  parentRevisionId?: string;
  operation?: "summarize" | "expand" | "changeTone" | "manual";
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface PatchRequest {
  operation: "summarize" | "expand" | "changeTone";
  extraWords?: number;
  style?: string;
}

export interface PatchResponse {
  originalContent: string;
  patchedContent: string;
  operation: string;
  metadata?: Record<string, unknown>;
}

export interface DiffChunk {
  type: "add" | "remove" | "equal";
  content: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}

export interface Document {
  id: string;
  title: string;
  sections: Section[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}
