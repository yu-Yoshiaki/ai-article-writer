import React, { useState } from 'react';
import { X, Zap, Expand, Palette } from 'lucide-react';
import { PatchRequest } from '../../types';

interface SectionPatchMenuProps {
  sectionId: string;
  content: string;
  onClose: () => void;
  onPreview: (original: string, patched: string, operation: string) => void;
  onApply: (original: string, patched: string, operation: string) => void;
}

export function SectionPatchMenu({ 
  sectionId: _sectionId, 
  content, 
  onClose, 
  onPreview, 
  onApply: _onApply 
}: SectionPatchMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState<PatchRequest['operation'] | null>(null);
  const [extraWords, setExtraWords] = useState(50);
  const [style, setStyle] = useState('');

  const handlePatch = async (operation: PatchRequest['operation']) => {
    setIsLoading(true);
    setSelectedOperation(operation);

    try {
      const request: PatchRequest = {
        operation,
        ...(operation === 'expand' && { extraWords }),
        ...(operation === 'changeTone' && { style }),
      };

      // TODO: 実際のAPI呼び出しに置き換える
      const response = await mockPatchAPI(content, request);
      
      onPreview(content, response.patchedContent, operation);
    } catch (error) {
      console.error('Patch failed:', error);
    } finally {
      setIsLoading(false);
      setSelectedOperation(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">AI パッチ機能</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Summarize */}
          <button
            onClick={() => handlePatch('summarize')}
            disabled={isLoading}
            className="flex w-full items-center rounded-lg border border-gray-200 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
          >
            <Zap className="mr-3 size-5 text-yellow-500" />
            <div className="text-left">
              <div className="font-medium">要約</div>
              <div className="text-sm text-gray-600">内容を簡潔にまとめます</div>
            </div>
            {isLoading && selectedOperation === 'summarize' && (
              <div className="ml-auto size-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
            )}
          </button>

          {/* Expand */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <Expand className="mr-3 size-5 text-green-500" />
              <div>
                <div className="font-medium">拡張</div>
                <div className="text-sm text-gray-600">内容を詳しく展開します</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                追加文字数
              </label>
              <input
                type="number"
                value={extraWords}
                onChange={(e) => setExtraWords(Number(e.target.value))}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="10"
                max="500"
              />
            </div>
            <button
              onClick={() => handlePatch('expand')}
              disabled={isLoading}
              className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading && selectedOperation === 'expand' ? '処理中...' : '拡張実行'}
            </button>
          </div>

          {/* Change Tone */}
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="mb-3 flex items-center">
              <Palette className="mr-3 size-5 text-purple-500" />
              <div>
                <div className="font-medium">トーン変更</div>
                <div className="text-sm text-gray-600">文体やスタイルを変更します</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                希望するスタイル
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="例: フォーマル、カジュアル、技術的"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handlePatch('changeTone')}
              disabled={isLoading || !style.trim()}
              className="w-full rounded-md bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 disabled:opacity-50"
            >
              {isLoading && selectedOperation === 'changeTone' ? '処理中...' : 'トーン変更実行'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// モックAPI関数（後で実際のAPIに置き換える）
async function mockPatchAPI(content: string, request: PatchRequest) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機

  let patchedContent = content;
  
  switch (request.operation) {
    case 'summarize':
      patchedContent = content.substring(0, Math.floor(content.length * 0.6)) + '...（要約版）';
      break;
    case 'expand':
      patchedContent = content + '\n\n追加の詳細情報がここに含まれます。' + 
        'さらなる説明や例、背景情報などが展開されています。';
      break;
    case 'changeTone':
      patchedContent = `【${request.style}スタイル】\n\n` + content;
      break;
  }

  return {
    originalContent: content,
    patchedContent,
    operation: request.operation,
    metadata: { timestamp: new Date().toISOString() }
  };
} 