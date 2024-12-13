import React from 'react';
import { FileText } from 'lucide-react';
import type { Article } from '../types';
import { SectionList } from './sections/SectionList';
import { ToneSelector } from './ToneSelector';
import { SeoAnalyzer } from './SeoAnalyzer';
import { ExportOptions } from './ExportOptions';

interface ArticleEditorProps {
  article: Article;
  onShowPreview: () => void;
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onUpdateSectionTitle: (index: number, title: string) => void;
  onSelectVariation: (sectionIndex: number, variationIndex: number) => void;
  onRegenerateVariations: (sectionIndex: number) => void;
  onAddSection: (index: number) => void;
  onToneChange?: (tone: ArticleTone) => void;
}

export function ArticleEditor({
  article,
  onShowPreview,
  onMoveSection,
  onUpdateSectionTitle,
  onSelectVariation,
  onRegenerateVariations,
  onAddSection,
  onToneChange
}: ArticleEditorProps) {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto py-8 px-4">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {article.theme}
          </h1>
          <button
            onClick={onShowPreview}
            className="mystical-button"
          >
            <FileText className="w-5 h-5 mr-2" />
            Preview Article
          </button>
        </div>
        
        <SectionList
          sections={article.sections}
          onMoveSection={onMoveSection}
          onUpdateSectionTitle={onUpdateSectionTitle}
          onSelectVariation={onSelectVariation}
          onRegenerateVariations={onRegenerateVariations}
          onAddSection={onAddSection}
        />
      </div>

      {/* Side Panel */}
      <div className="w-80 space-y-6">
        {onToneChange && (
          <ToneSelector
            value={article.tone || 'professional'}
            onChange={onToneChange}
          />
        )}
        
        {article.seoScore && (
          <SeoAnalyzer score={article.seoScore} />
        )}
        
        <ExportOptions article={article} />
      </div>
    </div>
  );
}