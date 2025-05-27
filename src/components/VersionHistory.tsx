import React from 'react';
import { History, RotateCcw } from 'lucide-react';
import type { EditorHistory } from '../types';

interface VersionHistoryProps {
  history: EditorHistory;
  onRestore: (version: number) => void;
}

export function VersionHistory({ history, onRestore }: VersionHistoryProps) {
  return (
    <div className="mystical-card space-y-4 p-4">
      <div className="flex items-center space-x-2 text-purple-400">
        <History className="size-5" />
        <h3 className="font-medium">Version History</h3>
      </div>

      <div className="space-y-2">
        {history.past.map((version, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-slate-800/30
                     p-3 transition-colors hover:bg-slate-800/50"
          >
            <div>
              <div className="text-slate-300">Version {index + 1}</div>
              <div className="text-sm text-slate-400">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <button
              onClick={() => onRestore(index)}
              className="rounded-lg p-2 text-purple-400 
                       transition-colors hover:bg-purple-900/20 hover:text-purple-300"
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}