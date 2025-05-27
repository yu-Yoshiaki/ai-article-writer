# エラーハンドリングとローディング状態の改善

## 概要
現在のエラーハンドリングとローディング状態の実装が不十分。ユーザー体験を向上させるため、統一的なエラー処理とローディング表示を実装する。

## 対象ファイル
- 新規: `src/components/ui/ErrorBoundary.tsx`
- 新規: `src/components/ui/LoadingSpinner.tsx`
- 新規: `src/components/ui/ErrorMessage.tsx`
- 新規: `src/app/error.tsx`
- 新規: `src/app/loading.tsx`
- 新規: `src/hooks/useErrorHandler.ts`
- `src/lib/errors.ts`（エラークラスの定義）

## ゴール
- [ ] グローバルエラーバウンダリーの実装
- [ ] 統一的なローディングコンポーネントの作成
- [ ] エラーメッセージの日本語化
- [ ] エラーログの実装
- [ ] リトライ機能の実装

## 実装詳細
- React Error Boundaryの実装
- Next.js error.tsxとloading.tsxの活用
- カスタムエラークラスの定義
- Toastを使用したエラー通知
- ネットワークエラーの特別な処理

## テスト項目
- [ ] 予期しないエラーがError Boundaryでキャッチされること
- [ ] ローディング中に適切なUIが表示されること
- [ ] エラーメッセージがユーザーフレンドリーであること
- [ ] リトライボタンが正常に動作すること