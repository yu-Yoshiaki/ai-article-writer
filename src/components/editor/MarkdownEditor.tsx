import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Section } from '../../types';
import { SectionPatchMenu } from './SectionPatchMenu';
import { DiffViewer } from './DiffViewer';

interface MarkdownEditorProps {
  sections: Section[];
  onUpdateSection: (sectionId: string, content: string) => void;
  onCreateRevision: (sectionId: string, content: string, operation: string) => void;
}

export function MarkdownEditor({ sections, onUpdateSection, onCreateRevision }: MarkdownEditorProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showPatchMenu, setShowPatchMenu] = useState(false);
  const [patchResult, setPatchResult] = useState<{
    original: string;
    patched: string;
    operation: string;
  } | null>(null);

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setShowPatchMenu(true);
  };

  const handlePatchApply = (original: string, patched: string, operation: string) => {
    if (selectedSectionId) {
      onUpdateSection(selectedSectionId, patched);
      onCreateRevision(selectedSectionId, patched, operation);
      setPatchResult(null);
      setShowPatchMenu(false);
      setSelectedSectionId(null);
    }
  };

  const handlePatchPreview = (original: string, patched: string, operation: string) => {
    setPatchResult({ original, patched, operation });
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div
          key={section.id}
          id={`section-${section.id}`}
          className="section-container group relative"
        >
          <div className="prose max-w-none">
            <div
              className="min-h-[100px] cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors hover:border-gray-300"
              onClick={() => handleSectionClick(section.id)}
            >
              {section.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Magic Button */}
          <button
            className="magic-button absolute right-2 top-2 rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              handleSectionClick(section.id);
            }}
          >
            <Wand2 className="size-4" />
          </button>
        </div>
      ))}

      {/* Patch Menu */}
      {showPatchMenu && selectedSectionId && (
        <SectionPatchMenu
          sectionId={selectedSectionId}
          content={sections.find(s => s.id === selectedSectionId)?.content || ''}
          onClose={() => {
            setShowPatchMenu(false);
            setSelectedSectionId(null);
            setPatchResult(null);
          }}
          onPreview={handlePatchPreview}
          onApply={handlePatchApply}
        />
      )}

      {/* Diff Viewer */}
      {patchResult && (
        <DiffViewer
          original={patchResult.original}
          patched={patchResult.patched}
          operation={patchResult.operation}
          onApply={() => handlePatchApply(patchResult.original, patchResult.patched, patchResult.operation)}
          onReject={() => setPatchResult(null)}
        />
      )}
    </div>
  );
} 