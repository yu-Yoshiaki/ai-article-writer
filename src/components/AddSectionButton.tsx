import React from 'react';
import { Plus } from 'lucide-react';

interface AddSectionButtonProps {
  onClick: () => void;
}

export function AddSectionButton({ onClick }: AddSectionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-2 
        rounded-lg border-2 border-dashed border-gray-300 py-2 text-gray-500 
        transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-700"
    >
      <Plus className="size-5 transition-transform group-hover:scale-110" />
      <span className="font-medium">Add New Section</span>
    </button>
  );
}