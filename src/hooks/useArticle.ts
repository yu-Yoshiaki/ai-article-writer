import { useState } from 'react';
import type { Article, Section, ArticleTone } from '../types';
import { generateArticle, generateNewVariations, generateNewSection, analyzeSeo } from '../services/articleService';
import { generateId } from '../utils/generateId';
import { useHistory } from './useHistory';

export function useArticle() {
  const [isLoading, setIsLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const history = useHistory();

  const handleThemeSubmit = async (theme: string) => {
    setIsLoading(true);
    try {
      const result = await generateArticle(theme);
      const seoScore = await analyzeSeo(result);
      const newArticle = { ...result, seoScore };
      setArticle(newArticle);
      history.push(newArticle);
    } catch (error) {
      console.error('Failed to generate article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSection = async (index: number) => {
    if (!article) return;
    
    try {
      const newSection = await generateNewSection(article.theme);
      const newSections = [...article.sections];
      const sectionWithId = {
        ...newSection,
        id: generateId(),
        selectedVariation: 0
      };
      
      newSections.splice(index + 1, 0, sectionWithId);
      const updatedArticle = { ...article, sections: newSections };
      setArticle(updatedArticle);
      history.push(updatedArticle);
    } catch (error) {
      console.error('Failed to add new section:', error);
    }
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (!article) return;
    const newSections = [...article.sections];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newSections[index], newSections[newIndex]] = [newSections[newIndex], newSections[index]];
    const updatedArticle = { ...article, sections: newSections };
    setArticle(updatedArticle);
    history.push(updatedArticle);
  };

  const handleUpdateSectionTitle = (index: number, title: string) => {
    if (!article) return;
    const newSections = [...article.sections];
    newSections[index] = { ...newSections[index], title };
    const updatedArticle = { ...article, sections: newSections };
    setArticle(updatedArticle);
    history.push(updatedArticle);
  };

  const handleSelectVariation = (sectionIndex: number, variationIndex: number) => {
    if (!article) return;
    const newSections = [...article.sections];
    newSections[sectionIndex] = { 
      ...newSections[sectionIndex], 
      selectedVariation: variationIndex 
    };
    const updatedArticle = { ...article, sections: newSections };
    setArticle(updatedArticle);
    history.push(updatedArticle);
  };

  const handleRegenerateVariations = async (sectionIndex: number) => {
    if (!article) return;
    const section = article.sections[sectionIndex];
    try {
      const newVariations = await generateNewVariations(section.id);
      const newSections = [...article.sections];
      newSections[sectionIndex] = {
        ...section,
        variations: newVariations,
        selectedVariation: 0
      };
      const updatedArticle = { ...article, sections: newSections };
      setArticle(updatedArticle);
      history.push(updatedArticle);
    } catch (error) {
      console.error('Failed to regenerate variations:', error);
    }
  };

  const handleToneChange = async (tone: ArticleTone) => {
    if (!article) return;
    const updatedArticle = { ...article, tone };
    setArticle(updatedArticle);
    history.push(updatedArticle);
  };

  const handleUpdateContent = async (updatedArticle: Article) => {
    try {
      const seoScore = await analyzeSeo(updatedArticle);
      const articleWithSeo = { ...updatedArticle, seoScore };
      setArticle(articleWithSeo);
      history.push(articleWithSeo);
    } catch (error) {
      console.error('Failed to analyze SEO:', error);
    }
  };

  return {
    article,
    isLoading,
    history,
    handleThemeSubmit,
    handleAddSection,
    handleMoveSection,
    handleUpdateSectionTitle,
    handleSelectVariation,
    handleRegenerateVariations,
    handleToneChange,
    handleUpdateContent
  };
}