import { fetchArticleContent, regenerateVariations, generateNewSection as apiGenerateNewSection, analyzeSeoScore } from './api/articleApi';
import type { Article, SeoScore } from '../types';

export async function generateArticle(theme: string): Promise<Article> {
  try {
    return await fetchArticleContent(theme);
  } catch (error) {
    console.error('Failed to generate article:', error);
    throw new Error('Failed to generate article content');
  }
}

export async function generateNewVariations(sectionId: string): Promise<string[]> {
  try {
    return await regenerateVariations(sectionId);
  } catch (error) {
    console.error('Failed to regenerate variations:', error);
    throw new Error('Failed to generate new variations');
  }
}

export async function generateNewSection(theme: string) {
  try {
    return await apiGenerateNewSection(theme);
  } catch (error) {
    console.error('Failed to generate new section:', error);
    throw new Error('Failed to generate new section');
  }
}

export async function analyzeSeo(article: Article): Promise<SeoScore> {
  try {
    return await analyzeSeoScore(article);
  } catch (error) {
    console.error('Failed to analyze SEO:', error);
    throw new Error('Failed to analyze SEO score');
  }
}