import React from 'react';
import { Copy, X, Sparkles } from 'lucide-react';
import type { Article } from '../types';
import { formatArticleText } from '../utils/clipboard';

interface PreviewProps {
  article: Article;
  onClose: () => void;
}

export function Preview({ article, onClose }: PreviewProps) {
  const handleCopy = () => {
    const text = formatArticleText(article.theme, article.sections);
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm">
      <div className="mystical-card flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-700/50 p-6">
          <div className="flex items-center space-x-3">
            <Sparkles className="size-6 text-purple-400" />
            <h2 className="text-xl font-bold text-slate-100">{article.theme}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition-colors hover:text-slate-200"
          >
            <X className="size-6" />
          </button>
        </div>
        
        <div className="flex-1 space-y-8 overflow-y-auto p-6">
          {article.sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">
                {section.title}
              </h3>
              <p className="leading-relaxed text-slate-300">
                {section.variations[section.selectedVariation]}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4 border-t border-slate-700/50 p-6">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 rounded-lg bg-slate-700/50 px-4 
                     py-2 text-slate-200 transition-colors hover:bg-slate-700"
          >
            <Copy className="size-5" />
            <span>Copy to Clipboard</span>
          </button>
          <button
            onClick={onClose}
            className="mystical-button"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}