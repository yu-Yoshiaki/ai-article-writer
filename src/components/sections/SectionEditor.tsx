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
    <div className="space-y-4 rounded-lg border border-gray-200 bg-indigo-950 p-4 shadow-sm transition-shadow hover:shadow-md">
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
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-300 transition-colors hover:bg-indigo-900 hover:text-blue-200"
        >
          <RefreshCw className="size-4" />
          Generate More Variations
        </button>
      </div>
    </div>
  );
}