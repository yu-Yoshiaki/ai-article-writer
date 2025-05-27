# Tailwind CSS設定の修正

## 概要
Tailwind CSSの設定ファイルが現在のプロジェクト構造と一致していないため、スタイルが正しく適用されない可能性がある。contentパスを修正する必要がある。

## 対象ファイル
- `tailwind.config.js`
- `src/app/globals.css`
- `src/index.css`

## ゴール
- [ ] tailwind.config.jsのcontentパスを修正（srcディレクトリを含める）
- [ ] globals.cssとindex.cssの重複を解消
- [ ] Tailwindのディレクティブが正しく設定されていることを確認
- [ ] ビルドしてスタイルが正しく適用されることを確認

## 実装詳細
- contentパスに`./src/**/*.{js,ts,jsx,tsx,mdx}`を追加
- Next.js App Routerに対応したパスを設定
- 不要なCSSファイルの統合または削除

## テスト項目
- [ ] 開発サーバーでTailwindクラスが適用されること
- [ ] ビルド時にエラーが発生しないこと
- [ ] カスタムカラーやテーマが正しく動作すること