# PatchWrite

AI と協調しながら記事を部分的に生成・リライトできる Web ライティングツール

## 特徴

- **AI パッチ機能**: 段落単位での AI による要約、拡張、トーン変更
- **差分可視化**: 変更箇所をハイライト表示で直感的に確認
- **履歴管理**: 変更履歴をツリー形式で管理、任意の版にロールバック可能
- **リアルタイムプレビュー**: 変更内容を適用前に確認

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
# または
yarn install
# または
pnpm install
```

### 2. Firebase 設定

1. [Firebase Console](https://console.firebase.google.com/)でプロジェクトを作成
2. Authentication > Sign-in method で Google 認証を有効化
3. プロジェクト設定から設定値を取得
4. プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定：

```env
VITE_FIREBASE_API_KEY=your-actual-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. 開発サーバーの起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

## 使い方

1. ホームページから「エディターを開く」をクリック
2. サンプルドキュメントが表示されます
3. 段落をクリックまたは魔法のボタン（🪄）をクリックして AI パッチメニューを開く
4. 希望する操作（要約、拡張、トーン変更）を選択
5. プレビューで変更内容を確認
6. 「適用」ボタンで変更を確定

## 技術スタック

- **フロントエンド**: React 18 + TypeScript + Vite
- **スタイリング**: Tailwind CSS
- **認証**: Firebase Authentication
- **アイコン**: Lucide React
- **差分計算**: カスタム実装（将来的に diff-match-patch に移行予定）

## 開発タスク進捗

- [x] T1: プロジェクトセットアップ
- [x] T2: Markdown セクションライザー
- [ ] T3: AI パッチ API (Edge)
- [x] T4: 差分ハイライト UI
- [ ] T5: Revisions DB & API
- [ ] T6: 履歴タイムマシン UI
- [ ] T7: 認証 & レート制限
- [ ] T8: デプロイ & CI

## ライセンス

MIT
