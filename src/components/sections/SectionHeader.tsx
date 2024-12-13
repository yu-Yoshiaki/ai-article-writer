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
    <div className="flex items-center justify-between group">
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdateTitle(e.target.value)}
        className="text-lg font-semibold bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none px-1 py-0.5 text-white w-full max-w-[80%] transition-colors"
      />
      <div className="flex items-center space-x-1">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Move section up"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1.5 hover:bg-gray-100 rounded-md disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
          title="Move section down"
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}