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
    <div className="group flex items-center justify-between">
      <input
        type="text"
        value={title}
        onChange={(e) => onUpdateTitle(e.target.value)}
        className="w-full max-w-[80%] border-b-2 border-transparent bg-transparent px-1 py-0.5 text-lg font-semibold text-white transition-colors hover:border-gray-200 focus:border-blue-500 focus:outline-none"
      />
      <div className="flex items-center space-x-1">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="rounded-md p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          title="Move section up"
        >
          <ChevronUp className="size-5 text-gray-600" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="rounded-md p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
          title="Move section down"
        >
          <ChevronDown className="size-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}