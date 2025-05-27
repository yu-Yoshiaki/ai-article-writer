import { useState, useCallback } from "react";
import useSWR, { mutate } from "swr";
import type { Article, ArticleTone } from "../types";
import {
  generateArticle,
  generateNewVariations,
  generateNewSection,
  analyzeSeo,
} from "../services/articleService";
import { generateId } from "../utils/generateId";
import { useHistory } from "./useHistory";
import { fetcher } from "@/lib/fetcher";

export function useArticle(articleId?: string) {
  const [isGenerating, setIsGenerating] = useState(false);
  const history = useHistory();

  // SWR for fetching article data
  const {
    data: article,
    error,
    isLoading,
    mutate: mutateArticle,
  } = useSWR<Article>(
    articleId ? `/api/articles/${articleId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const handleThemeSubmit = useCallback(
    async (theme: string) => {
      setIsGenerating(true);
      try {
        const result = await generateArticle(theme);
        const seoScore = await analyzeSeo(result);
        const newArticle = { ...result, seoScore };

        // Update local cache
        await mutateArticle(newArticle, false);

        // Update global cache if article has an ID
        if (newArticle.id) {
          await mutate(`/api/articles/${newArticle.id}`, newArticle);
        }

        history.push(newArticle);
        return newArticle;
      } catch (error) {
        console.error("Failed to generate article:", error);
        throw error;
      } finally {
        setIsGenerating(false);
      }
    },
    [mutateArticle, history]
  );

  const handleAddSection = useCallback(
    async (index: number) => {
      if (!article) return;

      try {
        const newSection = await generateNewSection(article.theme);
        const newSections = [...article.sections];
        const sectionWithId = {
          ...newSection,
          id: generateId(),
          selectedVariation: 0,
        };

        newSections.splice(index + 1, 0, sectionWithId);
        const updatedArticle = { ...article, sections: newSections };

        // Optimistic update
        await mutateArticle(updatedArticle, false);
        history.push(updatedArticle);
      } catch (error) {
        console.error("Failed to add new section:", error);
        // Revert on error
        await mutateArticle();
      }
    },
    [article, mutateArticle, history]
  );

  const handleMoveSection = useCallback(
    (index: number, direction: "up" | "down") => {
      if (!article) return;
      const newSections = [...article.sections];
      const newIndex = direction === "up" ? index - 1 : index + 1;
      [newSections[index], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[index],
      ];
      const updatedArticle = { ...article, sections: newSections };

      // Optimistic update
      mutateArticle(updatedArticle, false);
      history.push(updatedArticle);
    },
    [article, mutateArticle, history]
  );

  const handleUpdateSectionTitle = useCallback(
    (index: number, title: string) => {
      if (!article) return;
      const newSections = [...article.sections];
      newSections[index] = { ...newSections[index], title };
      const updatedArticle = { ...article, sections: newSections };

      // Optimistic update
      mutateArticle(updatedArticle, false);
      history.push(updatedArticle);
    },
    [article, mutateArticle, history]
  );

  const handleSelectVariation = useCallback(
    (sectionIndex: number, variationIndex: number) => {
      if (!article) return;
      const newSections = [...article.sections];
      newSections[sectionIndex] = {
        ...newSections[sectionIndex],
        selectedVariation: variationIndex,
      };
      const updatedArticle = { ...article, sections: newSections };

      // Optimistic update
      mutateArticle(updatedArticle, false);
      history.push(updatedArticle);
    },
    [article, mutateArticle, history]
  );

  const handleRegenerateVariations = useCallback(
    async (sectionIndex: number) => {
      if (!article) return;
      const section = article.sections[sectionIndex];
      try {
        const newVariations = await generateNewVariations(section.id);
        const newSections = [...article.sections];
        newSections[sectionIndex] = {
          ...section,
          variations: newVariations,
          selectedVariation: 0,
        };
        const updatedArticle = { ...article, sections: newSections };

        // Optimistic update
        await mutateArticle(updatedArticle, false);
        history.push(updatedArticle);
      } catch (error) {
        console.error("Failed to regenerate variations:", error);
        // Revert on error
        await mutateArticle();
      }
    },
    [article, mutateArticle, history]
  );

  const handleToneChange = useCallback(
    async (tone: ArticleTone) => {
      if (!article) return;
      const updatedArticle = { ...article, tone };

      // Optimistic update
      mutateArticle(updatedArticle, false);
      history.push(updatedArticle);
    },
    [article, mutateArticle, history]
  );

  const handleUpdateContent = useCallback(
    async (updatedArticle: Article) => {
      try {
        const seoScore = await analyzeSeo(updatedArticle);
        const articleWithSeo = { ...updatedArticle, seoScore };

        // Optimistic update
        await mutateArticle(articleWithSeo, false);
        history.push(articleWithSeo);
      } catch (error) {
        console.error("Failed to analyze SEO:", error);
        // Revert on error
        await mutateArticle();
      }
    },
    [mutateArticle, history]
  );

  return {
    article,
    isLoading: isLoading || isGenerating,
    error,
    history,
    handleThemeSubmit,
    handleAddSection,
    handleMoveSection,
    handleUpdateSectionTitle,
    handleSelectVariation,
    handleRegenerateVariations,
    handleToneChange,
    handleUpdateContent,
    mutateArticle,
  };
}
