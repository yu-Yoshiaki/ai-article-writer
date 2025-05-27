# React Hook FormとZodによるフォームバリデーション

## 概要
現在のフォーム実装にはバリデーションが不足している。React Hook FormとZodを使用して、型安全で堅牢なフォーム処理を実装する。

## 対象ファイル
- `package.json`（react-hook-form, zodの追加）
- `src/components/auth/LoginButton.tsx`
- `src/components/ThemeInput.tsx`
- 新規: `src/lib/validations/auth.ts`
- 新規: `src/lib/validations/article.ts`
- 新規: `src/hooks/useZodForm.ts`

## ゴール
- [ ] React Hook FormとZodをインストール
- [ ] 認証フォームのバリデーションスキーマを作成
- [ ] 記事作成/編集フォームのバリデーションを実装
- [ ] エラーメッセージの日本語化
- [ ] リアルタイムバリデーションの実装

## 実装詳細
- Zodスキーマの定義
- カスタムエラーメッセージ
- フォームの状態管理
- サーバーサイドバリデーションとの統合
- @hookform/resolversを使用したZod統合

## テスト項目
- [ ] 必須項目の検証が動作すること
- [ ] メールアドレス形式の検証が動作すること
- [ ] パスワード強度の検証が動作すること
- [ ] エラーメッセージが適切に表示されること