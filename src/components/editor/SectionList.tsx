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
          className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="font-medium text-sm text-gray-900">
                セクション {index + 1}
              </div>
              <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                {section.content.substring(0, 100)}
                {section.content.length > 100 && '...'}
              </div>
            </div>
            <div className="text-xs text-gray-400 ml-2">
              {section.content.length} 文字
            </div>
          </div>
        </div>
      ))}
      
      {sections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>セクションがありません</p>
          <p className="text-sm mt-1">Markdownテキストを入力してセクションを作成してください</p>
        </div>
      )}
    </div>
  );
} 