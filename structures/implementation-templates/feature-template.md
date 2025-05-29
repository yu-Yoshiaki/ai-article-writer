# 機能実装テンプレート

## 機能名: [機能名を記入]

### 概要

[機能の概要を記入]

### 対象ファイル

```
[影響するファイルのリストを記入]
```

### 実装手順

#### 1. 型定義の作成

```typescript
// src/types/[feature].ts
export interface [FeatureName] {
  // 型定義を記入
}
```

#### 2. サービス層の実装

```typescript
// src/services/[feature]Service.ts
export const [feature]Service = {
  // サービス関数を記入
};
```

#### 3. カスタムフックの実装

```typescript
// src/hooks/use[Feature].ts
export function use[Feature]() {
  // フック実装を記入
}
```

#### 4. コンポーネントの実装

```typescript
// src/components/[feature]/[Component].tsx
export function [Component]() {
  // コンポーネント実装を記入
}
```

#### 5. API ルートの実装

```typescript
// src/app/api/[feature]/route.ts
export async function GET() {
  // API実装を記入
}
```

#### 6. ページの実装

```typescript
// src/app/[feature]/page.tsx
export default function [Feature]Page() {
  // ページ実装を記入
}
```

### 実装チェックリスト

#### 基本機能

- [ ] [チェック項目 1]
- [ ] [チェック項目 2]
- [ ] [チェック項目 3]

#### UI/UX

- [ ] レスポンシブデザイン
- [ ] アクセシビリティ対応
- [ ] エラーハンドリング
- [ ] ローディング状態

#### データ管理

- [ ] SWR によるキャッシング
- [ ] バリデーション
- [ ] エラーハンドリング

#### テスト

- [ ] 単体テスト
- [ ] 統合テスト
- [ ] E2E テスト

### 依存関係

- [依存パッケージ 1]
- [依存パッケージ 2]

### 関連機能

- [関連機能 1]
- [関連機能 2]

### 実装時の注意点

1. [注意点 1]
2. [注意点 2]
3. [注意点 3]

### 完了条件

- [ ] 全ての機能が正常に動作する
- [ ] テストが全て通る
- [ ] ドキュメントが更新されている
- [ ] コードレビューが完了している
