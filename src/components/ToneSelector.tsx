import React from 'react';
import { Wand2 } from 'lucide-react';
import type { ArticleTone } from '../types';

interface ToneSelectorProps {
  value: ArticleTone;
  onChange: (tone: ArticleTone) => void;
}

const tones: Array<{ value: ArticleTone; label: string; description: string }> = [
  { value: 'formal', label: 'Formal', description: 'Professional and business-like' },
  { value: 'casual', label: 'Casual', description: 'Relaxed and conversational' },
  { value: 'professional', label: 'Professional', description: 'Expert and authoritative' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'technical', label: 'Technical', description: 'Detailed and precise' },
];

export function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div className="mystical-card p-4 space-y-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <Wand2 className="w-5 h-5" />
        <h3 className="font-medium">Writing Tone</h3>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {tones.map((tone) => (
          <button
            key={tone.value}
            onClick={() => onChange(tone.value)}
            className={`p-3 rounded-lg text-left transition-all ${
              value === tone.value
                ? 'bg-purple-500/20 border border-purple-500/50'
                : 'hover:bg-slate-700/30'
            }`}
          >
            <div className="font-medium text-slate-200">{tone.label}</div>
            <div className="text-sm text-slate-400">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}