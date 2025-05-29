# AI Article Writer - プロジェクト概要

## 1. プロジェクト概要

### 1.1 目的
AI Article Writerは、AIアシスタンスを活用して高品質な記事を効率的に作成・編集・管理するためのWebアプリケーションです。

### 1.2 主要機能
- AI支援による記事生成と編集
- セクション単位での記事構成管理
- リアルタイムプレビュー
- SEO最適化分析
- 複数のエクスポート形式対応
- バージョン管理と編集履歴
- ユーザー認証とサブスクリプション管理

### 1.3 技術スタック
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS + tailwindcss-animate
- **UIコンポーネント**: Radix UI
- **エディター**: Monaco Editor
- **認証**: Firebase Auth
- **データフェッチング**: SWR
- **フォーム管理**: React Hook Form
- **バリデーション**: Zod
- **アイコン**: Lucide React
- **AI**: OpenAI GPT-3.5
- **決済**: Stripe

## 2. アーキテクチャ

### 2.1 フロントエンド構成
```
src/
├── app/           # Next.js App Router
├── components/    # UIコンポーネント
├── hooks/         # カスタムフック
├── services/      # ビジネスロジック
├── types/         # TypeScript型定義
├── utils/         # ユーティリティ関数
└── lib/           # 外部ライブラリ設定
```

### 2.2 バックエンド構成
- Next.js Route Handlers (API Routes)
- Firebase Authentication
- OpenAI API統合
- Stripe API統合

### 2.3 データフロー
1. **クライアント**: React Components
2. **状態管理**: SWR Cache + Local State
3. **API層**: Next.js Route Handlers
4. **外部サービス**: Firebase, OpenAI, Stripe

## 3. セキュリティ

### 3.1 認証・認可
- Firebase Authenticationによるユーザー認証
- PrivateRouteコンポーネントによるルート保護
- APIレベルでの認証チェック

### 3.2 データ保護
- 環境変数による機密情報管理
- クライアントサイドでのバリデーション（Zod）
- サーバーサイドでの入力検証

## 4. パフォーマンス最適化

### 4.1 フロントエンド
- SWRによる効率的なデータキャッシング
- デバウンス処理による過剰なAPI呼び出し防止
- 楽観的更新によるUX向上

### 4.2 バックエンド
- Edge Runtimeの活用
- 適切なキャッシュ戦略

## 5. 開発環境

### 5.1 必要なツール
- Node.js 18以上
- npm (パッケージマネージャー)
- Git

### 5.2 環境変数
```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID

# OpenAI
OPENAI_API_KEY

# Stripe
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### 5.3 開発コマンド
```bash
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # ESLintチェック
npm run typecheck # TypeScriptチェック
```