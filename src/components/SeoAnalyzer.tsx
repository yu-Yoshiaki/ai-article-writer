import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';
import type { SeoScore } from '../types';

interface SeoAnalyzerProps {
  score: SeoScore;
}

export function SeoAnalyzer({ score }: SeoAnalyzerProps) {
  return (
    <div className="mystical-card p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-purple-400">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-medium">SEO Analysis</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-400">Score:</span>
          <span className={`font-medium ${
            score.overall >= 80 ? 'text-green-400' :
            score.overall >= 60 ? 'text-yellow-400' : 'text-red-400'
          }`}>{score.overall}/100</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300">Key Phrases</h4>
          <div className="flex flex-wrap gap-2">
            {score.keywords.map((keyword, index) => (
              <div
                key={index}
                className="px-2 py-1 rounded-full text-sm bg-slate-700/50 
                         border border-slate-600/50 text-slate-300"
              >
                {keyword.word}
                <span className="ml-1 text-slate-400">
                  ({keyword.frequency}x)
                </span>
              </div>
            ))}
          </div>
        </div>

        {score.suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-300">Suggestions</h4>
            <div className="space-y-2">
              {score.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 text-sm text-slate-300"
                >
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}