import React from 'react';
import { Section } from '../../types';

interface SectionListProps {
  sections: Section[];
  onSectionClick: (sectionId: string) => void;
}

export function SectionList({ sections, onSectionClick }: SectionListProps) {
  return (
    <div className="space-y-2 p-4">
      {sections.map((section, index) => (
        <div
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className="cursor-pointer rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">
                セクション {index + 1}
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-gray-600">
                {section.content.substring(0, 100)}
                {section.content.length > 100 && '...'}
              </div>
            </div>
            <div className="ml-2 text-xs text-gray-400">
              {section.content.length} 文字
            </div>
          </div>
        </div>
      ))}
      
      {sections.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <p>セクションがありません</p>
          <p className="mt-1 text-sm">Markdownテキストを入力してセクションを作成してください</p>
        </div>
      )}
    </div>
  );
} 