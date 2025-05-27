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
    <div className="mystical-card flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-slate-700/50 p-4">
        <h3 className="font-medium text-slate-200">Live Preview</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('desktop')}
            className={`rounded-lg p-2 transition-colors ${
              view === 'desktop'
                ? 'bg-purple-900/20 text-purple-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Monitor className="size-5" />
          </button>
          <button
            onClick={() => setView('mobile')}
            className={`rounded-lg p-2 transition-colors ${
              view === 'mobile'
                ? 'bg-purple-900/20 text-purple-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            <Smartphone className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
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