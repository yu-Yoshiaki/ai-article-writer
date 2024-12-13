import React from 'react';
import { SectionEditor } from './SectionEditor';
import { AddSectionButton } from './AddSectionButton';
import type { Section } from '../../types';

interface SectionListProps {
  sections: Section[];
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onUpdateSectionTitle: (index: number, title: string) => void;
  onSelectVariation: (sectionIndex: number, variationIndex: number) => void;
  onRegenerateVariations: (sectionIndex: number) => void;
  onAddSection: (index: number) => void;
}

export function SectionList({
  sections,
  onMoveSection,
  onUpdateSectionTitle,
  onSelectVariation,
  onRegenerateVariations,
  onAddSection
}: SectionListProps) {
  return (
    <div className="space-y-6 py-4">
      <AddSectionButton onClick={() => onAddSection(-1)} />
      {sections.map((section: Section, index: number) => (
        <React.Fragment key={section.id}>
          <SectionEditor
            section={section}
            isFirst={index === 0}
            isLast={index === sections.length - 1}
            onMoveUp={() => onMoveSection(index, 'up')}
            onMoveDown={() => onMoveSection(index, 'down')}
            onRegenerateVariations={() => onRegenerateVariations(index)}
            onSelectVariation={(variationIndex) => onSelectVariation(index, variationIndex)}
            onUpdateTitle={(title) => onUpdateSectionTitle(index, title)}
          />
          <AddSectionButton onClick={() => onAddSection(index)} />
        </React.Fragment>
      ))}
    </div>
  );
}