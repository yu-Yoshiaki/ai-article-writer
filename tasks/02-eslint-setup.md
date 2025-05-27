# ESLint設定のセットアップ

## 概要
プロジェクトにESLint設定が存在しないため、コード品質の一貫性が保たれていない。Next.jsとTypeScriptに対応したESLint設定を追加する。

## 対象ファイル
- `.eslintrc.json`（新規作成）
- `package.json`（ESLint関連パッケージの追加）
- `.gitignore`（必要に応じて）

## ゴール
- [ ] Next.js推奨のESLint設定を追加
- [ ] TypeScript対応の設定を追加
- [ ] Tailwind CSSのクラス順序に関するルールを追加
- [ ] npm run lintコマンドが正常に動作すること

## 実装詳細
- `eslint-config-next`を使用
- `@typescript-eslint/parser`と`@typescript-eslint/eslint-plugin`を追加
- `eslint-plugin-tailwindcss`を追加してクラス順序を自動整形
- React Hook関連のルールを設定

## テスト項目
- [ ] npm run lintでエラーが検出されること
- [ ] --fixオプションで自動修正が動作すること
- [ ] VSCodeでリアルタイムにエラーが表示されること