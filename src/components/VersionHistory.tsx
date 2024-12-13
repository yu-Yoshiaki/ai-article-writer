import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import type { EditorHistory } from '../types';

interface VersionHistoryProps {
  history: EditorHistory;
  onRestore: (version: number) => void;
}

export function VersionHistory({ history, onRestore }: VersionHistoryProps) {
  return (
    <div className="mystical-card p-4 space-y-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <History className="w-5 h-5" />
        <h3 className="font-medium">Version History</h3>
      </div>

      <div className="space-y-2">
        {history.past.map((version, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg
                     bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
          >
            <div>
              <div className="text-slate-300">Version {index + 1}</div>
              <div className="text-sm text-slate-400">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => onRestore(index)}
              className="p-2 text-purple-400 hover:text-purple-300 
                       hover:bg-purple-900/20 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}