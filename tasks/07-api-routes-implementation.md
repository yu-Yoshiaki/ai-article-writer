# API Routesの実装

## 概要
現在API Routesが最小限しか実装されていない。CLAUDE.mdのガイドラインに従い、すべてのデータ操作をAPI Routes経由で行うように実装する。

## 対象ファイル
- 新規: `src/app/api/articles/route.ts`
- 新規: `src/app/api/articles/[id]/route.ts`
- 新規: `src/app/api/users/route.ts`
- 新規: `src/app/api/users/[id]/route.ts`
- 新規: `src/app/api/auth/route.ts`
- 新規: `src/lib/api-helpers.ts`

## ゴール
- [ ] 記事のCRUD APIを実装
- [ ] ユーザー管理APIを実装
- [ ] 認証ミドルウェアの実装
- [ ] エラーハンドリングの統一
- [ ] レスポンスフォーマットの標準化

## 実装詳細
- Next.js 13+ App RouterのRoute Handlersを使用
- 認証チェックミドルウェア
- リクエストバリデーション
- 適切なHTTPステータスコードの返却
- CORS設定（必要に応じて）

## テスト項目
- [ ] 各エンドポイントが正しいデータを返すこと
- [ ] 認証が必要なエンドポイントで未認証アクセスが拒否されること
- [ ] エラー時に適切なエラーレスポンスが返ること
- [ ] ページネーションが正しく動作すること