import React from 'react';
import { Plus } from 'lucide-react';

interface AddSectionButtonProps {
  onClick: () => void;
}

export function AddSectionButton({ onClick }: AddSectionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg 
        flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 
        hover:border-gray-400 hover:bg-gray-50 transition-colors group"
    >
      <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="font-medium">Add New Section</span>
    </button>
  );
}