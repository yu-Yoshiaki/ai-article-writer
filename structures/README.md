# AI Article Writer - 要件定義ドキュメント

このディレクトリには、AI Article Writer プロジェクトの詳細な要件定義が含まれています。

## 📋 ドキュメント一覧

### 基本要件定義

1. [プロジェクト概要](./01-project-overview.md) - プロジェクトの目的と技術スタック
2. [コア機能要件](./02-core-features.md) - 記事編集、AI 支援、分析機能
3. [認証・サブスクリプション](./03-authentication-subscription.md) - Firebase Auth、Stripe 統合
4. [UI コンポーネント](./04-ui-components.md) - デザインシステムとコンポーネント
5. [API アーキテクチャ](./05-api-architecture.md) - API 設計とデータモデル
6. [データフローと状態管理](./06-data-flow-state-management.md) - SWR + Context API

### 🚀 効率的な開発のための新構造

#### クイックスタート

- **[クイックリファレンス](./quick-reference.md)** - 開発時に素早く参照できる情報
- **[ファイルマッピング表](./file-mapping.md)** - 機能とファイルの対応関係

#### 実装ガイド

- **[実装ガイド一覧](./implementation-guides/README.md)** - 機能別の詳細実装ガイド
  - [記事編集機能ガイド](./implementation-guides/article-editor-guide.md)
  - [AI 支援機能ガイド](./implementation-guides/ai-assistance-guide.md)
  - [認証機能ガイド](./implementation-guides/authentication-guide.md)
  - [サブスクリプション機能ガイド](./implementation-guides/subscription-guide.md)

#### テンプレート

- **[実装テンプレート](./implementation-templates/feature-template.md)** - 新機能実装用テンプレート

## 🎯 効率的な開発フロー

### 新機能実装時

1. **[ファイルマッピング表](./file-mapping.md)** で影響ファイルを確認
2. **[実装ガイド](./implementation-guides/)** で詳細な実装方法を確認
3. **[テンプレート](./implementation-templates/feature-template.md)** をコピーして作業開始
4. 必要なファイルのみを編集して実装

### バグ修正・機能改善時

1. **[クイックリファレンス](./quick-reference.md)** で関連ファイルを特定
2. **[ファイルマッピング表](./file-mapping.md)** で影響範囲を確認
3. 該当ファイルのみを修正

## プロジェクト構造

```
ai-article-writer/
├── structures/                    # 要件定義ドキュメント（このディレクトリ）
│   ├── implementation-guides/     # 機能別実装ガイド
│   ├── implementation-templates/  # 実装テンプレート
│   ├── file-mapping.md           # ファイルマッピング表
│   ├── quick-reference.md        # クイックリファレンス
│   └── 01-06-*.md               # 基本要件定義
├── src/
│   ├── app/                      # Next.js App Router
│   ├── components/               # UIコンポーネント
│   ├── hooks/                    # カスタムフック
│   ├── services/                 # ビジネスロジック
│   ├── types/                    # TypeScript型定義
│   └── utils/                    # ユーティリティ関数
├── tasks/                        # 実装タスク管理
└── docs/                         # その他のドキュメント
```

## 実装状況

### ✅ 実装済み機能

- 基本的な記事編集機能
- AI 支援（記事生成、セクションパッチ）
- SEO 分析
- Firebase 認証基盤
- Stripe サブスクリプション基本機能
- 主要 UI コンポーネント
- SWR によるデータフェッチング

### 🚧 実装予定機能

- ソーシャルログイン
- 二要素認証
- 使用量追跡システム
- リアルタイムコラボレーション
- 高度な分析機能
- 管理者ダッシュボード

## 開発ガイドライン

1. **新機能の実装前に[クイックリファレンス](./quick-reference.md)を確認**
2. **[ファイルマッピング表](./file-mapping.md)で影響ファイルを特定**
3. **該当する[実装ガイド](./implementation-guides/)を参照**
4. **[テンプレート](./implementation-templates/)を使用して効率的に実装**
5. **TypeScript の型定義を徹底**
6. **SWR を使用したデータフェッチングを遵守**

## 関連ドキュメント

- [CLAUDE.md](/CLAUDE.md) - AI アシスタント向けガイドライン
- [README.md](/README.md) - プロジェクトの基本情報
- [tasks/](/tasks/) - 実装タスクの管理

## 💡 このドキュメント構造の利点

1. **トークン効率**: 必要な情報のみを参照してコンテキストを最小化
2. **開発速度向上**: 機能別ガイドで迷わず実装
3. **保守性**: ファイルマッピングで影響範囲を明確化
4. **一貫性**: テンプレートで統一された実装パターン
5. **スケーラビリティ**: 機能追加時も構造を維持
