# AI Article Writer - コア機能要件定義

## 1. 記事編集機能

### 1.1 記事エディター (ArticleEditor)
**目的**: 記事の作成・編集を統合的に管理するメインインターフェース

**機能要件**:
- セクションベースの記事構成管理
- リアルタイムプレビュー表示
- トーン選択（formal, casual, professional, creative）
- SEO分析結果の表示
- エクスポート機能（Markdown, HTML, テキスト）
- 自動保存機能

**実装済みコンポーネント**:
- `components/ArticleEditor.tsx`
- `components/editor/MarkdownEditor.tsx`
- `components/LivePreview.tsx`

### 1.2 セクション管理
**目的**: 記事を論理的なセクションに分割して管理

**機能要件**:
- セクションの追加・削除・並び替え
- セクションごとの編集
- 複数バリエーションの管理
- セクションタイプの選択（intro, body, conclusion）

**実装済みコンポーネント**:
- `components/sections/SectionEditor.tsx`
- `components/sections/SectionList.tsx`
- `components/sections/SectionHeader.tsx`
- `components/sections/SectionVariations.tsx`

### 1.3 履歴管理
**目的**: 編集履歴の追跡とバージョン管理

**機能要件**:
- 変更履歴の記録
- Undo/Redo機能
- 特定バージョンへの復元
- 差分表示

**実装済みコンポーネント**:
- `components/editor/HistoryPanel.tsx`
- `components/editor/DiffViewer.tsx`
- `components/VersionHistory.tsx`
- `hooks/useHistory.ts`

## 2. AI支援機能

### 2.1 AIアシスタント
**目的**: チャット形式でのAI支援

**機能要件**:
- フローティングチャットUI
- コンテキストを考慮した提案
- リアルタイムレスポンス
- 会話履歴の保持

**実装済みコンポーネント**:
- `components/AIAssistant.tsx`
- `app/api/chat/route.ts`

### 2.2 セクションパッチ機能
**目的**: 既存テキストのAIによる改善

**機能要件**:
- 要約機能（50%短縮）
- 拡張機能（詳細追加）
- トーン変更（formal/casual切り替え）
- ワンクリック適用

**実装済みコンポーネント**:
- `components/editor/SectionPatchMenu.tsx`
- `services/articleService.ts` (patchSection)

### 2.3 記事生成
**目的**: AIによる新規記事の自動生成

**機能要件**:
- タイトルベースの記事生成
- テンプレート選択
- トーン指定
- SEO最適化された構成

**実装済みAPI**:
- `app/api/articles/route.ts` (POST)
- `services/articleService.ts` (generateArticle)

## 3. 分析・最適化機能

### 3.1 SEO分析
**目的**: 検索エンジン最適化のための分析と提案

**機能要件**:
- リアルタイムSEOスコア計算
- 改善提案の表示
- キーワード密度分析
- メタデータ最適化提案

**実装済みコンポーネント**:
- `components/SeoAnalyzer.tsx`
- `components/KeywordAnalyzer.tsx`
- `services/articleService.ts` (analyzeSeo)

### 3.2 キーワード分析
**目的**: 記事内のキーワード使用状況の分析

**機能要件**:
- キーワード頻度カウント
- 関連キーワード提案
- キーワード密度計算
- 競合分析（将来実装）

**実装済みコンポーネント**:
- `components/KeywordAnalyzer.tsx`

## 4. エクスポート・インポート機能

### 4.1 エクスポート
**目的**: 作成した記事を各種形式で出力

**機能要件**:
- Markdown形式エクスポート
- HTML形式エクスポート
- プレーンテキストエクスポート
- PDF形式（将来実装）

**実装済みコンポーネント**:
- `components/ExportOptions.tsx`
- `utils/markdown.ts`

### 4.2 テンプレート
**目的**: 頻繁に使用する記事構成の再利用

**機能要件**:
- 事前定義テンプレートの選択
- カスタムテンプレートの作成
- テンプレートのプレビュー

**実装済みコンポーネント**:
- `components/TemplateSelector.tsx`

## 5. UIカスタマイズ機能

### 5.1 テーマ管理
**目的**: ユーザー好みのUI外観設定

**機能要件**:
- ダークモード/ライトモード切り替え
- カスタムカラーテーマ
- フォントサイズ調整
- レイアウトカスタマイズ

**実装済みコンポーネント**:
- `components/ThemeCustomizer.tsx`
- `components/ThemeInput.tsx`
- `hooks/useTheme.ts`

### 5.2 トーン選択
**目的**: 記事の文体統一

**機能要件**:
- プリセットトーンの選択
- トーン別プレビュー
- カスタムトーン定義

**実装済みコンポーネント**:
- `components/ToneSelector.tsx`

## 6. データ永続化

### 6.1 自動保存
**目的**: 編集内容の自動保存

**機能要件**:
- 定期的な自動保存
- 保存状態の表示
- 競合解決
- オフライン対応

**実装済み機能**:
- `hooks/useDocument.ts`
- `hooks/useLocalStorage.ts`

### 6.2 記事管理API
**目的**: 記事データのCRUD操作

**機能要件**:
- 記事の作成・読取・更新・削除
- ユーザー別の記事管理
- 検索・フィルタリング
- ページネーション

**実装済みAPI**:
- `app/api/articles/route.ts`
- `app/api/articles/[id]/route.ts`
- `services/api/articleApi.ts`