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
          <Sparkles className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <input
            type="text"
            value={section.title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="text-lg font-semibold bg-transparent border-b border-transparent 
                     hover:border-purple-500/30 focus:border-purple-500 focus:outline-none
                     text-slate-100 transition-all duration-300"
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="p-2 hover:bg-slate-700/50 rounded-lg disabled:opacity-50 transition-colors"
            title="Move section up"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="p-2 hover:bg-slate-700/50 rounded-lg disabled:opacity-50 transition-colors"
            title="Move section down"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
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
                flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full
                border transition-colors duration-300
                ${index === section.selectedVariation 
                  ? 'text-purple-400 border-purple-400 bg-purple-900/30' 
                  : 'text-slate-400 border-slate-600'
                }
              `}>
                {index === section.selectedVariation ? (
                  <Check className="w-4 h-4" />
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
          className="flex items-center gap-2 px-4 py-2 text-sm text-purple-400 
                   hover:text-purple-300 hover:bg-purple-900/20 rounded-lg transition-all duration-300"
        >
          <RefreshCw className="w-4 h-4" />
          Generate More Variations
        </button>
      </div>
    </div>
  );
}