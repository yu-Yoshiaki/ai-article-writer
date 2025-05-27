import React from 'react';
import { History, RotateCcw } from 'lucide-react';

export function HistoryPanel() {
  // TODO: 実際の履歴データを取得するフックを実装
  const mockHistory = [
    {
      id: '1',
      operation: 'manual',
      timestamp: '2024-01-15T10:30:00Z',
      content: '初期作成'
    },
    {
      id: '2',
      operation: 'expand',
      timestamp: '2024-01-15T10:35:00Z',
      content: '内容を拡張しました'
    },
    {
      id: '3',
      operation: 'summarize',
      timestamp: '2024-01-15T10:40:00Z',
      content: '要約版を作成'
    }
  ];

  const getOperationLabel = (operation: string) => {
    switch (operation) {
      case 'summarize':
        return '要約';
      case 'expand':
        return '拡張';
      case 'changeTone':
        return 'トーン変更';
      case 'manual':
        return '手動編集';
      default:
        return operation;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-3 p-4">
      {mockHistory.map((item, index) => (
        <div
          key={item.id}
          className="flex cursor-pointer items-start space-x-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50"
        >
          <div className="shrink-0">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
              <History className="size-4 text-blue-600" />
            </div>
          </div>
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">
                {getOperationLabel(item.operation)}
              </div>
              <div className="text-xs text-gray-500">
                {formatTimestamp(item.timestamp)}
              </div>
            </div>
            <div className="mt-1 truncate text-xs text-gray-600">
              {item.content}
            </div>
          </div>

          <button
            className="shrink-0 p-1 text-gray-400 transition-colors hover:text-blue-600"
            title="この版に戻す"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      ))}

      {mockHistory.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <History className="mx-auto mb-2 size-8 text-gray-300" />
          <p>履歴がありません</p>
          <p className="mt-1 text-sm">編集を開始すると履歴が表示されます</p>
        </div>
      )}
    </div>
  );
} 