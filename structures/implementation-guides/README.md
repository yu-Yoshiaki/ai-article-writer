# 実装ガイド

このディレクトリには、各機能の実装に必要な情報を集約したガイドファイルが含まれています。

## 使用方法

1. 実装したい機能に対応するガイドファイルを参照
2. 必要なファイルと実装内容を確認
3. テンプレートを使用して実装開始

## ガイドファイル一覧

### コア機能

- [記事編集機能](./article-editor-guide.md)
- [AI 支援機能](./ai-assistance-guide.md)
- [SEO 分析機能](./seo-analysis-guide.md)

### 認証・サブスクリプション

- [認証機能](./authentication-guide.md)
- [サブスクリプション機能](./subscription-guide.md)

### UI コンポーネント

- [基本コンポーネント](./basic-components-guide.md)
- [エディターコンポーネント](./editor-components-guide.md)

### API・データ管理

- [API 実装](./api-implementation-guide.md)
- [状態管理](./state-management-guide.md)

## ファイル構造マッピング

```
機能 → 影響するファイル
├── 記事編集
│   ├── src/app/editor/page.tsx
│   ├── src/components/editor/
│   ├── src/hooks/useArticle.ts
│   └── src/services/articleService.ts
├── AI支援
│   ├── src/app/api/ai/
│   ├── src/components/ai/
│   └── src/services/aiService.ts
└── ...
```
