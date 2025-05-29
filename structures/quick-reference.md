# クイックリファレンス

開発時に素早く参照できる情報をまとめたガイドです。

## 🚀 新機能実装の流れ

1. **ファイルマッピング確認**: `file-mapping.md` で影響ファイルを確認
2. **実装ガイド参照**: `implementation-guides/` で詳細な実装方法を確認
3. **テンプレート使用**: `implementation-templates/feature-template.md` をコピーして作業開始
4. **実装**: 必要なファイルのみを編集
5. **テスト**: 機能が正常に動作することを確認

## 📁 よく使うファイルパス

### コア機能

```
記事編集: src/app/editor/page.tsx
AI支援: src/app/api/ai/
認証: src/app/(auth)/
サブスクリプション: src/app/subscription/
```

### 共通ファイル

```
型定義: src/types/
サービス: src/services/
フック: src/hooks/
コンポーネント: src/components/
```

## 🔧 実装パターン

### 新しいページの追加

```typescript
// 1. ページファイル作成
src/app/[feature]/page.tsx

// 2. 必要に応じてレイアウト
src/app/[feature]/layout.tsx

// 3. コンポーネント作成
src/components/[feature]/
```

### 新しい API 追加

```typescript
// 1. APIルート作成
src/app/api/[endpoint]/route.ts

// 2. サービス関数追加
src/services/[feature]Service.ts

// 3. カスタムフック作成
src/hooks/use[Feature].ts
```

### 新しいコンポーネント追加

```typescript
// 1. コンポーネント作成
src / components / [category] / [Component].tsx;

// 2. 型定義追加（必要に応じて）
src / types / [feature].ts;

// 3. スタイル調整
// Tailwind CSSクラスを使用
```

## 📋 実装チェックリスト（簡易版）

### 必須項目

- [ ] TypeScript 型定義
- [ ] エラーハンドリング
- [ ] ローディング状態
- [ ] レスポンシブデザイン

### 推奨項目

- [ ] SWR キャッシング
- [ ] バリデーション（Zod）
- [ ] アクセシビリティ
- [ ] テスト

## 🎯 機能別クイックアクセス

### 記事編集機能

- **ガイド**: `implementation-guides/article-editor-guide.md`
- **主要ファイル**: `src/app/editor/page.tsx`
- **型定義**: `src/types/article.ts`

### AI 支援機能

- **ガイド**: `implementation-guides/ai-assistance-guide.md`
- **主要ファイル**: `src/app/api/ai/`
- **型定義**: `src/types/ai.ts`

### 認証機能

- **ガイド**: `implementation-guides/authentication-guide.md`
- **主要ファイル**: `src/app/(auth)/`
- **型定義**: `src/types/auth.ts`

### サブスクリプション機能

- **ガイド**: `implementation-guides/subscription-guide.md`
- **主要ファイル**: `src/app/subscription/`
- **型定義**: `src/types/subscription.ts`

## 🛠️ よく使うコマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npm run type-check

# リント
npm run lint

# ビルド
npm run build
```

## 📦 よく使うパッケージ

### UI 関連

- `@radix-ui/*`: UI コンポーネント
- `lucide-react`: アイコン
- `tailwindcss`: スタイリング

### データ管理

- `swr`: データフェッチング
- `react-hook-form`: フォーム
- `zod`: バリデーション

### 外部サービス

- `firebase`: 認証
- `stripe`: 決済
- `@ai-sdk/openai`: AI 機能

## 🔍 トラブルシューティング

### よくある問題

1. **型エラー**: `src/types/` で型定義を確認
2. **API エラー**: `src/app/api/` でルート実装を確認
3. **スタイル問題**: Tailwind CSS クラスを確認
4. **状態管理**: SWR キャッシュの状態を確認

### デバッグ方法

1. ブラウザの開発者ツールでコンソールエラーを確認
2. Network タブで API 呼び出しを確認
3. React Developer Tools で状態を確認

## 📚 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [SWR ドキュメント](https://swr.vercel.app/)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Radix UI ドキュメント](https://www.radix-ui.com/docs)
