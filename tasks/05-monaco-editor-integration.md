# Monaco Editorの統合

## 概要
現在のMarkdownエディタを高機能なMonaco Editorに置き換え、シンタックスハイライト、自動補完、マルチカーソルなどの機能を提供する。

## 対象ファイル
- `package.json`（Monaco Editor関連パッケージの追加）
- `src/components/editor/MarkdownEditor.tsx`
- 新規: `src/components/editor/MonacoEditor.tsx`
- 新規: `src/lib/monaco-config.ts`
- `next.config.js`（Webpack設定の追加）

## ゴール
- [ ] @monaco-editor/reactをインストール
- [ ] Markdown言語サポートの設定
- [ ] テーマのカスタマイズ（ライト/ダークモード対応）
- [ ] 自動保存機能の実装
- [ ] ショートカットキーの設定

## 実装詳細
- Monaco EditorのMarkdown拡張を設定
- カスタムテーマの作成
- エディタのオプション設定（フォントサイズ、行番号など）
- Next.jsのWebpack設定でWorkerの読み込みを対応

## テスト項目
- [ ] Markdownシンタックスハイライトが動作すること
- [ ] 日本語入力が正常に動作すること
- [ ] テーマ切り替えが即座に反映されること
- [ ] パフォーマンスが低下しないこと