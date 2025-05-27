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
  sectionId, 
  content, 
  onClose, 
  onPreview, 
  onApply 
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">AI パッチ機能</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Summarize */}
          <button
            onClick={() => handlePatch('summarize')}
            disabled={isLoading}
            className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <Zap className="h-5 w-5 text-yellow-500 mr-3" />
            <div className="text-left">
              <div className="font-medium">要約</div>
              <div className="text-sm text-gray-600">内容を簡潔にまとめます</div>
            </div>
            {isLoading && selectedOperation === 'summarize' && (
              <div className="ml-auto animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            )}
          </button>

          {/* Expand */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Expand className="h-5 w-5 text-green-500 mr-3" />
              <div>
                <div className="font-medium">拡張</div>
                <div className="text-sm text-gray-600">内容を詳しく展開します</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                追加文字数
              </label>
              <input
                type="number"
                value={extraWords}
                onChange={(e) => setExtraWords(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="10"
                max="500"
              />
            </div>
            <button
              onClick={() => handlePatch('expand')}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isLoading && selectedOperation === 'expand' ? '処理中...' : '拡張実行'}
            </button>
          </div>

          {/* Change Tone */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Palette className="h-5 w-5 text-purple-500 mr-3" />
              <div>
                <div className="font-medium">トーン変更</div>
                <div className="text-sm text-gray-600">文体やスタイルを変更します</div>
              </div>
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                希望するスタイル
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="例: フォーマル、カジュアル、技術的"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handlePatch('changeTone')}
              disabled={isLoading || !style.trim()}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
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