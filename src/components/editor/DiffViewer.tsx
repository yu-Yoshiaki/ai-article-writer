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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              変更プレビュー - {getOperationLabel(operation)}
            </h3>
            <button
              onClick={onReject}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 font-medium text-gray-900">変更内容:</h4>
              <div className="rounded-lg bg-gray-50 p-4">
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

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium text-gray-900">変更前:</h4>
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {original}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 font-medium text-gray-900">変更後:</h4>
                <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="whitespace-pre-wrap text-sm text-gray-700">
                    {patched}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t bg-gray-50 p-6">
          <button
            onClick={onReject}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            破棄
          </button>
          <button
            onClick={onApply}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <Check className="mr-2 size-4" />
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