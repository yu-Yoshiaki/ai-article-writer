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
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="mystical-card max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-slate-100">{article.theme}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {article.sections.map((section) => (
            <div key={section.id} className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">
                {section.title}
              </h3>
              <p className="text-slate-300 leading-relaxed">
                {section.variations[section.selectedVariation]}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-700/50 flex justify-end space-x-4">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 
                     text-slate-200 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Copy className="w-5 h-5" />
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