import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const themes = [
  { id: 'dark', name: 'Dark Mystic', colors: ['#0f172a', '#1e293b'] },
  { id: 'light', name: 'Light Ethereal', colors: ['#f8fafc', '#e2e8f0'] },
  { id: 'cosmic', name: 'Cosmic Purple', colors: ['#2e1065', '#4c1d95'] },
  { id: 'forest', name: 'Enchanted Forest', colors: ['#064e3b', '#065f46'] },
];

export function ThemeCustomizer() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mystical-card p-4 space-y-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <Palette className="w-5 h-5" />
        <h3 className="font-medium">Customize Theme</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`p-3 rounded-lg border transition-all ${
              theme === t.id
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-slate-700/50 hover:border-purple-500/30'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{
                  background: `linear-gradient(135deg, ${t.colors[0]} 0%, ${t.colors[1]} 100%)`
                }}
              />
              <span className="text-sm text-slate-200">{t.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}