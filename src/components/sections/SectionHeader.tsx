import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  isFirst: boolean;
  isLast: boolean;
  onUpdateTitle: (title: string) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function SectionHeader({
  title,
  isFirst,
  isLast,
  onUpdateTitle,
  onMoveUp,
  onMoveDown
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdateTitle(e.target.value)}
        className="text-lg font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
      />
      <div className="flex items-center space-x-2">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Move section up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
          title="Move section down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}