# コンポーネント構造のリファクタリング

## 概要
ArticleEditorコンポーネントが肥大化しているため、責務を分割し、保守性とテスト容易性を向上させる

## 対象ファイル
- `src/components/ArticleEditor.tsx`
- `src/components/editor/MarkdownEditor.tsx`
- `src/components/sections/SectionList.tsx`
- `src/hooks/useArticle.ts`
- `src/types/index.ts`

## ゴール
- [ ] ArticleEditorの責務を適切に分割
- [ ] 共通ロジックのカスタムフックへの抽出
- [ ] Props drilling の解消
- [ ] コンポーネントの単体テスト可能性の向上

## 実装詳細
- 記事の状態管理をContext APIで実装
- エディター機能を独立したコンポーネントに分離
- 共通UIロジックをカスタムフックに抽出
- TypeScriptの型定義を強化

## テスト項目
- [ ] 既存の機能が正常に動作すること
- [ ] パフォーマンスの劣化がないこと
- [ ] 新しいコンポーネント構造でのテストカバレッジ