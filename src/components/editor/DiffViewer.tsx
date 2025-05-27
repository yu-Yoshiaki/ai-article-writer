import React from 'react';
import { Check, X } from 'lucide-react';
import { useDiff } from '../../hooks/useDiff';

interface DiffViewerProps {
  original: string;
  patched: string;
  operation: string;
  onApply: () => void;
  onReject: () => void;
}

export function DiffViewer({ original, patched, operation, onApply, onReject }: DiffViewerProps) {
  const { diffChunks } = useDiff(original, patched);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              変更プレビュー - {getOperationLabel(operation)}
            </h3>
            <button
              onClick={onReject}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">変更内容:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="prose max-w-none">
                  {diffChunks.map((chunk, index) => (
                    <span
                      key={index}
                      className={getDiffClassName(chunk.type)}
                      data-diff={chunk.type}
                      aria-label={getDiffAriaLabel(chunk.type, chunk.content)}
                    >
                      {chunk.content}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">変更前:</h4>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {original}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">変更後:</h4>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {patched}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onReject}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            破棄
          </button>
          <button
            onClick={onApply}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Check className="h-4 w-4 mr-2" />
            適用
          </button>
        </div>
      </div>
    </div>
  );
}

function getDiffClassName(type: 'add' | 'remove' | 'equal'): string {
  switch (type) {
    case 'add':
      return 'diff-add';
    case 'remove':
      return 'diff-remove';
    case 'equal':
      return 'diff-equal';
    default:
      return '';
  }
}

function getDiffAriaLabel(type: 'add' | 'remove' | 'equal', content: string): string {
  switch (type) {
    case 'add':
      return `追加: ${content}`;
    case 'remove':
      return `削除: ${content}`;
    case 'equal':
      return `変更なし: ${content}`;
    default:
      return content;
  }
}

function getOperationLabel(operation: string): string {
  switch (operation) {
    case 'summarize':
      return '要約';
    case 'expand':
      return '拡張';
    case 'changeTone':
      return 'トーン変更';
    default:
      return operation;
  }
} 