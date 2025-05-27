import React, { useState } from 'react';
import { MarkdownEditor } from '../editor/MarkdownEditor';
import { SectionList } from '../editor/SectionList';
import { HistoryPanel } from '../editor/HistoryPanel';
import { useDocument } from '../../hooks/useDocument';

export function EditorPage() {
  const [showHistory, setShowHistory] = useState(false);
  const { document, sections, isLoading, updateSection, createRevision } = useDocument();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Editor */}
          <div className="flex-1">
            <div className="rounded-lg border bg-white shadow-sm">
              <div className="border-b p-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {document?.title || '新しいドキュメント'}
                </h1>
                <p className="mt-2 text-gray-600">
                  段落をクリックして AI パッチ機能を使用できます
                </p>
              </div>
              
              <div className="p-6">
                <MarkdownEditor
                  sections={sections}
                  onUpdateSection={updateSection}
                  onCreateRevision={createRevision}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="space-y-6">
              {/* Section List */}
              <div className="rounded-lg border bg-white shadow-sm">
                <div className="border-b p-4">
                  <h3 className="font-semibold text-gray-900">セクション一覧</h3>
                </div>
                <SectionList 
                  sections={sections}
                  onSectionClick={(sectionId) => {
                    // セクションにスクロール
                    const element = document.getElementById(`section-${sectionId}`);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              </div>

              {/* History Panel */}
              {showHistory && (
                <div className="rounded-lg border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b p-4">
                    <h3 className="font-semibold text-gray-900">履歴</h3>
                    <button
                      onClick={() => setShowHistory(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  <HistoryPanel />
                </div>
              )}

              {!showHistory && (
                <button
                  onClick={() => setShowHistory(true)}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  履歴を表示
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 