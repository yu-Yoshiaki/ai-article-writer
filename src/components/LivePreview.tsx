import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import type { Article } from '../types';
import { generateMarkdown } from '../utils/markdown';

interface LivePreviewProps {
  article: Article;
}

export function LivePreview({ article }: LivePreviewProps) {
  const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
  const markdown = generateMarkdown(article);

  return (
    <div className="mystical-card h-full flex flex-col">
      <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
        <h3 className="font-medium text-slate-200">Live Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('desktop')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'desktop'
                ? 'text-purple-400 bg-purple-900/20'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Monitor className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('mobile')}
            className={`p-2 rounded-lg transition-colors ${
              view === 'mobile'
                ? 'text-purple-400 bg-purple-900/20'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Smartphone className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className={`mx-auto ${
          view === 'mobile' ? 'max-w-sm' : 'max-w-3xl'
        }`}>
          <div className="prose prose-invert">
            <h1>{article.theme}</h1>
            {article.sections.map((section) => (
              <div key={section.id}>
                <h2>{section.title}</h2>
                <p>{section.variations[section.selectedVariation]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}