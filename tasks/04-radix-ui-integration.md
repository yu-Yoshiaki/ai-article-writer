# Radix UIコンポーネントの統合

## 概要
現在カスタムUIコンポーネントを使用しているが、アクセシビリティとUXの観点からRadix UIコンポーネントに移行する。

## 対象ファイル
- `package.json`（Radix UIパッケージの追加）
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- 新規: `src/components/ui/Dialog.tsx`
- 新規: `src/components/ui/Dropdown.tsx`
- 新規: `src/components/ui/Toast.tsx`

## ゴール
- [ ] 必要なRadix UIパッケージをインストール
- [ ] 既存のUIコンポーネントをRadix UIベースに置き換え
- [ ] ダイアログ、ドロップダウン、トーストなどの新規コンポーネントを追加
- [ ] アクセシビリティの向上（キーボードナビゲーション、ARIA属性）
- [ ] Tailwind CSSとの統合

## 実装詳細
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-toast
- @radix-ui/react-popover
- class-variance-authority (CVA)を使用したスタイリング

## テスト項目
- [ ] キーボードナビゲーションが正常に動作すること
- [ ] スクリーンリーダーでの読み上げが適切であること
- [ ] モバイルデバイスでのタッチ操作が可能であること
- [ ] アニメーションがスムーズであること