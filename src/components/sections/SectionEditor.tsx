import React from 'react';
import { RefreshCw } from 'lucide-react';
import type { Section } from '../../types';
import { SectionHeader } from './SectionHeader';
import { SectionVariations } from './SectionVariations';

interface SectionEditorProps {
  section: Section;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRegenerateVariations: () => void;
  onSelectVariation: (index: number) => void;
  onUpdateTitle: (title: string) => void;
}

export function SectionEditor({
  section,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRegenerateVariations,
  onSelectVariation,
  onUpdateTitle,
}: SectionEditorProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-indigo-950 shadow-sm hover:shadow-md transition-shadow">
      <SectionHeader
        title={section.title}
        isFirst={isFirst}
        isLast={isLast}
        onUpdateTitle={onUpdateTitle}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
      />

      <SectionVariations
        variations={section.variations}
        selectedVariation={section.selectedVariation}
        onSelectVariation={onSelectVariation}
      />

      <div className="flex justify-end pt-2">
        <button
          onClick={onRegenerateVariations}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-300 hover:text-blue-200 hover:bg-indigo-900 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Generate More Variations
        </button>
      </div>
    </div>
  );
}