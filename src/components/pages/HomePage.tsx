import React from 'react';
import Link from 'next/link';
import { PenTool, Zap, History, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            PatchWrite
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI と協調しながら記事を部分的に生成・リライトできる Web ライティングツール
          </p>
          <Link 
            href="/editor"
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PenTool className="mr-2 h-5 w-5" />
            エディターを開く
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Zap className="h-8 w-8 text-yellow-500 mr-3" />
              <h3 className="text-lg font-semibold">AI パッチ機能</h3>
            </div>
            <p className="text-gray-600">
              段落単位でAIによる要約、拡張、トーン変更が可能。GPT-4oとの協調編集。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <History className="h-8 w-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">履歴管理</h3>
            </div>
            <p className="text-gray-600">
              変更履歴をツリー形式で管理。任意の版にロールバック可能。
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold">差分可視化</h3>
            </div>
            <p className="text-gray-600">
              変更箇所をハイライト表示。追加・削除・変更を直感的に確認。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 