import React from 'react';
import Link from 'next/link';
import { PenTool, Zap, History, Users } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-5xl font-bold text-gray-900">
            PatchWrite
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            AI と協調しながら記事を部分的に生成・リライトできる Web ライティングツール
          </p>
          <Link 
            href="/editor"
            className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <PenTool className="mr-2 size-5" />
            エディターを開く
          </Link>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center">
              <Zap className="mr-3 size-8 text-yellow-500" />
              <h3 className="text-lg font-semibold">AI パッチ機能</h3>
            </div>
            <p className="text-gray-600">
              段落単位でAIによる要約、拡張、トーン変更が可能。GPT-4oとの協調編集。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center">
              <History className="mr-3 size-8 text-green-500" />
              <h3 className="text-lg font-semibold">履歴管理</h3>
            </div>
            <p className="text-gray-600">
              変更履歴をツリー形式で管理。任意の版にロールバック可能。
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center">
              <Users className="mr-3 size-8 text-purple-500" />
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