import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';
import type { Article } from '../types';

interface KeywordAnalyzerProps {
  article: Article;
}

export function KeywordAnalyzer({ article }: KeywordAnalyzerProps) {
  const keywords = analyzeKeywords(article);

  return (
    <div className="mystical-card space-y-4 p-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <Hash className="size-5" />
        <h3 className="font-medium">Keyword Analysis</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {keywords.map((keyword, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-700/50 bg-slate-800/30 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-300">{keyword.word}</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`size-4 ${
                    keyword.trend > 0 ? 'text-green-400' : 'text-red-400'
                  }`} />
                  <span className="text-sm text-slate-400">{keyword.count}x</span>
                </div>
              </div>
              <div className="mt-1 text-sm text-slate-400">
                Relevance: {keyword.relevance}%
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-purple-500/30 bg-purple-900/20 p-3">
          <h4 className="mb-2 font-medium text-purple-300">Suggestions</h4>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>• Consider adding more industry-specific terms</li>
            <li>• Increase usage of your primary keyword</li>
            <li>• Add more long-tail keyword variations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function analyzeKeywords(_article: Article) {
  // Simulate keyword analysis
  return [
    { word: 'technology', count: 5, trend: 1, relevance: 95 },
    { word: 'innovation', count: 3, trend: 1, relevance: 85 },
    { word: 'future', count: 2, trend: -1, relevance: 75 },
    { word: 'development', count: 4, trend: 1, relevance: 90 }
  ];
}