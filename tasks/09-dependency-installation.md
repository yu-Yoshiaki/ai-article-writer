# 必要な依存関係のインストール

## 概要
CLAUDE.mdで定義されている技術スタックに必要なパッケージがインストールされていない。すべての必要なパッケージをインストールする。

## 対象ファイル
- `package.json`
- `package-lock.json`

## ゴール
- [ ] SWRのインストール
- [ ] Radix UIコンポーネントのインストール
- [ ] Monaco Editorのインストール
- [ ] React Hook FormとZodのインストール
- [ ] その他の必要なユーティリティパッケージのインストール

## 実装詳細
インストールが必要なパッケージ：
```bash
# データフェッチング
npm install swr

# UIコンポーネント
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-toast @radix-ui/react-popover @radix-ui/react-switch @radix-ui/react-tabs

# エディタ
npm install @monaco-editor/react

# フォーム処理
npm install react-hook-form zod @hookform/resolvers

# ユーティリティ
npm install class-variance-authority clsx tailwind-merge
npm install sonner # トースト通知
npm install date-fns # 日付処理

# 開発依存関係
npm install -D @types/node eslint-config-next @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-tailwindcss
```

## テスト項目
- [ ] すべてのパッケージが正常にインストールされること
- [ ] package-lock.jsonが更新されること
- [ ] TypeScriptの型定義が利用可能であること
- [ ] ビルドエラーが発生しないこと