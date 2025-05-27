import React from 'react';
import { RefreshCw, ChevronUp, ChevronDown, Check, Sparkles } from 'lucide-react';
import type { Section } from '../types';

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
    <div className="mystical-section group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="size-5 text-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <input
            type="text"
            value={section.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="border-b border-transparent bg-transparent text-lg font-semibold 
                     text-slate-100 transition-all duration-300
                     hover:border-purple-500/30 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="rounded-lg p-2 transition-colors hover:bg-slate-700/50 disabled:opacity-50"
            title="Move section up"
          >
            <ChevronUp className="size-5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="rounded-lg p-2 transition-colors hover:bg-slate-700/50 disabled:opacity-50"
            title="Move section down"
          >
            <ChevronDown className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4">
        {section.variations.map((variation, index) => (
          <div
            key={index}
            onClick={() => onSelectVariation(index)}
            className={`variation-card ${
              index === section.selectedVariation ? 'selected' : 'bg-slate-800/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`
                flex size-6 shrink-0 items-center justify-center rounded-full border
                transition-colors duration-300
                ${index === section.selectedVariation 
                  ? 'border-purple-400 bg-purple-900/30 text-purple-400' 
                  : 'border-slate-600 text-slate-400'
                }
              `}>
                {index === section.selectedVariation ? (
                  <Check className="size-4" />
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 text-sm leading-relaxed text-slate-300">
                {variation}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onRegenerateVariations}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm 
                   text-purple-400 transition-all duration-300 hover:bg-purple-900/20 hover:text-purple-300"
        >
          <RefreshCw className="size-4" />
          Generate More Variations
        </button>
      </div>
    </div>
  );
}