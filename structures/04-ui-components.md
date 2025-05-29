# AI Article Writer - UIコンポーネント要件定義

## 1. 基本UIコンポーネント

### 1.1 Button
**目的**: 統一されたボタンスタイルの提供

**機能要件**:
- バリアント: primary, secondary, destructive, outline, ghost, link
- サイズ: default, sm, lg, icon
- 状態: default, hover, active, disabled, loading
- アイコン対応

**実装**:
- `components/ui/Button.tsx`
- Radix UIベース + Tailwind CSS

### 1.2 Input
**目的**: フォーム入力フィールド

**機能要件**:
- タイプ: text, email, password, number, search
- 状態: default, focus, error, disabled
- ラベル・ヘルパーテキスト対応
- バリデーション表示

**実装**:
- `components/ui/Input.tsx`
- React Hook Form統合

### 1.3 Dialog
**目的**: モーダルダイアログの表示

**機能要件**:
- オーバーレイ表示
- アニメーション
- キーボードナビゲーション（ESCで閉じる）
- フォーカストラップ
- アクセシビリティ対応

**実装**:
- `components/ui/Dialog.tsx`
- Radix UI Dialog使用

### 1.4 Dropdown
**目的**: ドロップダウンメニュー

**機能要件**:
- 単一/複数選択
- 検索機能
- グループ化
- カスタムレンダリング
- キーボードナビゲーション

**実装**:
- `components/ui/Dropdown.tsx`
- Radix UI Select/DropdownMenu使用

### 1.5 Toast
**目的**: 通知メッセージの表示

**機能要件**:
- タイプ: success, error, warning, info
- 自動消去
- 手動消去
- アクション付き通知
- スタック表示

**実装**:
- `components/ui/Toast.tsx`
- Radix UI Toast使用

## 2. レイアウトコンポーネント

### 2.1 Layout
**目的**: アプリケーション全体のレイアウト管理

**機能要件**:
- ヘッダー・サイドバー・メインコンテンツエリア
- レスポンシブデザイン
- サイドバーの開閉
- ダークモード対応

**実装**:
- `components/layout/Layout.tsx`
- `components/layout/Sidebar.tsx`

### 2.2 Sidebar
**目的**: ナビゲーションと機能アクセス

**機能要件**:
- ナビゲーションメニュー
- ユーザー情報表示
- 折りたたみ可能
- モバイル対応（ドロワー）
- アクティブ状態表示

**実装済み機能**:
- メインナビゲーション
- ユーザープロファイルセクション
- テーマ切り替え
- ログアウト

## 3. エディター関連コンポーネント

### 3.1 MarkdownEditor
**目的**: Markdownベースのテキスト編集

**機能要件**:
- シンタックスハイライト
- リアルタイムプレビュー
- ツールバー
- ショートカットキー
- 自動保存

**実装**:
- `components/editor/MarkdownEditor.tsx`
- Monaco Editor統合

### 3.2 DiffViewer
**目的**: テキスト差分の視覚化

**機能要件**:
- 行単位の差分表示
- 追加/削除/変更の色分け
- サイドバイサイド表示
- インライン表示
- 差分ナビゲーション

**実装**:
- `components/editor/DiffViewer.tsx`
- カスタム差分アルゴリズム

### 3.3 SectionPatchMenu
**目的**: AIによるテキスト編集メニュー

**機能要件**:
- フローティングメニュー
- コンテキストメニュー
- アクション: 要約、拡張、トーン変更
- プレビュー表示
- ワンクリック適用

**実装**:
- `components/editor/SectionPatchMenu.tsx`
- Radix UI Popover使用

## 4. 分析・可視化コンポーネント

### 4.1 SeoAnalyzer
**目的**: SEOスコアと改善提案の表示

**機能要件**:
- スコアの視覚化（プログレスバー/チャート）
- 項目別評価
- 改善提案リスト
- リアルタイム更新
- 詳細説明のツールチップ

**実装**:
- `components/SeoAnalyzer.tsx`
- カスタムチャートコンポーネント

### 4.2 KeywordAnalyzer
**目的**: キーワード分析結果の表示

**機能要件**:
- キーワード頻度グラフ
- キーワードクラウド
- 密度計算表示
- フィルタリング
- エクスポート機能

**実装**:
- `components/KeywordAnalyzer.tsx`

### 4.3 HistoryPanel
**目的**: 編集履歴の表示と管理

**機能要件**:
- タイムライン表示
- 変更内容のプレビュー
- バージョン間の比較
- 復元機能
- フィルタリング（日付、ユーザー）

**実装**:
- `components/editor/HistoryPanel.tsx`
- 仮想スクロール対応

## 5. インタラクティブコンポーネント

### 5.1 AIAssistant
**目的**: AI支援チャットインターフェース

**機能要件**:
- フローティングウィンドウ
- チャット履歴
- 入力サジェスト
- コード/Markdownレンダリング
- コピー機能

**実装**:
- `components/AIAssistant.tsx`
- WebSocket/SSE対応

### 5.2 ToneSelector
**目的**: 記事トーンの選択UI

**機能要件**:
- ビジュアルセレクター
- トーン説明
- プレビュー機能
- カスタムトーン追加
- 最近使用したトーン

**実装**:
- `components/ToneSelector.tsx`
- Radix UI RadioGroup使用

### 5.3 TemplateSelector
**目的**: 記事テンプレートの選択

**機能要件**:
- テンプレートギャラリー
- カテゴリフィルター
- プレビュー表示
- お気に入り機能
- カスタムテンプレート管理

**実装**:
- `components/TemplateSelector.tsx`
- グリッドレイアウト

## 6. デザインシステム

### 6.1 カラーパレット
```css
/* ライトモード */
--background: 0 0% 100%
--foreground: 222.2 84% 4.9%
--primary: 222.2 47.4% 11.2%
--primary-foreground: 210 40% 98%
--secondary: 210 40% 96.1%
--secondary-foreground: 222.2 47.4% 11.2%
--muted: 210 40% 96.1%
--muted-foreground: 215.4 16.3% 46.9%
--accent: 210 40% 96.1%
--accent-foreground: 222.2 47.4% 11.2%
--destructive: 0 84.2% 60.2%
--destructive-foreground: 210 40% 98%

/* ダークモード */
--background: 222.2 84% 4.9%
--foreground: 210 40% 98%
/* ... */
```

### 6.2 スペーシングシステム
- 4pxベースのスペーシング
- Tailwindデフォルトスケール使用
- コンポーネント間: 16px-24px
- セクション間: 32px-48px

### 6.3 タイポグラフィ
- フォント: システムフォントスタック
- 見出し: 24px-48px
- 本文: 16px
- 小文字: 14px
- 行間: 1.5-1.75

### 6.4 アニメーション
- トランジション: 150ms ease-in-out
- モーダル: fade + scale
- ドロップダウン: slide + fade
- tailwindcss-animate使用

## 7. アクセシビリティ

### 7.1 基本要件
- WAI-ARIA対応
- キーボードナビゲーション
- スクリーンリーダー対応
- 適切なコントラスト比
- フォーカスインジケーター

### 7.2 実装方法
- Radix UIの活用（アクセシビリティ組み込み）
- セマンティックHTML
- 適切なARIAラベル
- エラーメッセージの関連付け