# 記事編集機能 実装ガイド

## 概要

記事編集機能の実装に必要な情報をまとめたガイドです。

## 対象ファイル

```
src/app/editor/page.tsx                    # メインエディターページ
src/components/editor/
├── ArticleEditor.tsx                      # エディターコンポーネント
├── SectionManager.tsx                     # セクション管理
└── PreviewPanel.tsx                       # プレビューパネル
src/hooks/
├── useArticle.ts                          # 記事データ管理
└── useEditor.ts                           # エディター状態管理
src/services/articleService.ts             # 記事関連API
src/types/article.ts                       # 記事型定義
src/app/api/articles/                      # 記事API
```

## 主要な型定義

```typescript
// src/types/article.ts
export interface Article {
  id: string;
  title: string;
  content: string;
  sections: Section[];
  metadata: ArticleMetadata;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  order: number;
  type: "text" | "heading" | "list" | "code";
}

export interface ArticleMetadata {
  tags: string[];
  category: string;
  status: "draft" | "published" | "archived";
  seoTitle?: string;
  seoDescription?: string;
}
```

## 実装パターン

### 1. エディターページ (src/app/editor/page.tsx)

```typescript
"use client";

import { ArticleEditor } from "@/components/editor/ArticleEditor";
import { useArticle } from "@/hooks/useArticle";

export default function EditorPage() {
  const { article, updateArticle, saveArticle } = useArticle();

  return (
    <div className="h-screen flex">
      <ArticleEditor
        article={article}
        onUpdate={updateArticle}
        onSave={saveArticle}
      />
    </div>
  );
}
```

### 2. カスタムフック (src/hooks/useArticle.ts)

```typescript
import useSWR from "swr";
import { articleService } from "@/services/articleService";

export function useArticle(articleId?: string) {
  const { data: article, mutate } = useSWR(
    articleId ? `/api/articles/${articleId}` : null,
    () => articleService.getArticle(articleId!)
  );

  const updateArticle = async (updates: Partial<Article>) => {
    // 楽観的更新
    mutate({ ...article, ...updates }, false);

    try {
      const updated = await articleService.updateArticle(articleId!, updates);
      mutate(updated);
    } catch (error) {
      // エラー時は元に戻す
      mutate(article);
      throw error;
    }
  };

  return { article, updateArticle, mutate };
}
```

### 3. サービス層 (src/services/articleService.ts)

```typescript
export const articleService = {
  async getArticle(id: string): Promise<Article> {
    const response = await fetch(`/api/articles/${id}`);
    if (!response.ok) throw new Error("Failed to fetch article");
    return response.json();
  },

  async updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
    const response = await fetch(`/api/articles/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update article");
    return response.json();
  },

  async createArticle(
    article: Omit<Article, "id" | "createdAt" | "updatedAt">
  ): Promise<Article> {
    const response = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    if (!response.ok) throw new Error("Failed to create article");
    return response.json();
  },
};
```

## 実装チェックリスト

### 基本機能

- [ ] 記事の作成・編集・削除
- [ ] リアルタイムプレビュー
- [ ] 自動保存機能
- [ ] セクション管理（追加・削除・並び替え）
- [ ] 編集履歴の管理

### UI/UX

- [ ] Monaco Editor の統合
- [ ] レスポンシブデザイン
- [ ] キーボードショートカット
- [ ] ドラッグ&ドロップによるセクション並び替え
- [ ] 保存状態の表示

### データ管理

- [ ] SWR によるキャッシング
- [ ] 楽観的更新
- [ ] エラーハンドリング
- [ ] バリデーション（Zod）

### パフォーマンス

- [ ] デバウンス処理
- [ ] 仮想スクロール（大量セクション対応）
- [ ] 遅延読み込み

## 依存関係

### 必須パッケージ

- `@monaco-editor/react`: エディター
- `swr`: データフェッチング
- `react-hook-form`: フォーム管理
- `zod`: バリデーション
- `uuid`: ID 生成

### 関連機能

- AI 支援機能（パッチ提案）
- SEO 分析機能
- エクスポート機能

## 実装時の注意点

1. **状態管理**: SWR のキャッシュを適切に活用
2. **パフォーマンス**: 大きなコンテンツでも快適に動作するよう最適化
3. **ユーザビリティ**: 直感的な操作を重視
4. **データ整合性**: 楽観的更新時のエラーハンドリング
5. **アクセシビリティ**: キーボード操作への対応
