# AI Article Writer - データフローと状態管理要件定義

## 1. 状態管理アーキテクチャ

### 1.1 全体設計
**原則**:
- SWRによるサーバーステート管理
- React Context APIによるグローバルステート
- useStateによるローカルステート
- 楽観的更新の実装

**データの分類**:
- **サーバーステート**: API経由で取得・更新されるデータ
- **クライアントステート**: UI状態、一時的なデータ
- **永続化ステート**: ローカルストレージ保存データ

### 1.2 SWR設定
**実装**: `providers/SwrProvider.tsx`

```typescript
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 2000,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  shouldRetryOnError: true,
  fetcher: (url: string) => fetcher(url)
}
```

## 2. データフローパターン

### 2.1 記事データフロー
```
[User Action] → [Component] → [Custom Hook] → [API Service] → [API Route] → [External Service]
     ↑                              ↓
     └──────── [SWR Cache] ←────────┘
```

**実装例**: 記事取得
1. `ArticleEditor`コンポーネントがマウント
2. `useArticle`フックが`useSWR`を呼び出し
3. `articleApi.fetchArticle`がAPIリクエスト
4. `/api/articles/[id]`がデータを返す
5. SWRがキャッシュに保存
6. コンポーネントが再レンダリング

### 2.2 楽観的更新フロー
```
[User Edit] → [Optimistic Update] → [UI Update]
                    ↓
              [API Request] → [Success/Error]
                    ↓              ↓
              [Confirm]      [Rollback]
```

**実装例**: セクション更新
```typescript
const updateSection = async (newContent: string) => {
  // 楽観的更新
  mutate(
    `/api/articles/${id}`,
    { ...article, sections: updatedSections },
    false
  );
  
  try {
    // API呼び出し
    await articleApi.updateArticle(id, { sections: updatedSections });
    // 再検証
    mutate(`/api/articles/${id}`);
  } catch (error) {
    // ロールバック
    mutate(`/api/articles/${id}`, article, false);
  }
};
```

## 3. カスタムフック実装

### 3.1 useArticle
**目的**: 記事データの取得・更新管理

**機能**:
```typescript
interface UseArticleReturn {
  article: Article | null;
  isLoading: boolean;
  error: Error | null;
  updateArticle: (data: Partial<Article>) => Promise<void>;
  deleteArticle: () => Promise<void>;
  refreshArticle: () => Promise<void>;
}
```

**実装パターン**:
- SWRによるデータフェッチ
- 楽観的更新
- エラーハンドリング
- ローディング状態管理

### 3.2 useDocument
**目的**: ドキュメント編集状態の管理

**機能**:
```typescript
interface UseDocumentReturn {
  content: string;
  isDirty: boolean;
  lastSaved: Date | null;
  updateContent: (content: string) => void;
  save: () => Promise<void>;
  autoSave: boolean;
  setAutoSave: (enabled: boolean) => void;
}
```

**実装詳細**:
- デバウンスによる自動保存
- 編集状態の追跡
- 保存状態の表示

### 3.3 useHistory
**目的**: 編集履歴とUndo/Redo機能

**機能**:
```typescript
interface UseHistoryReturn<T> {
  current: T;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  push: (state: T) => void;
  clear: () => void;
}
```

**実装詳細**:
- スタックベースの履歴管理
- 最大履歴数の制限
- メモリ効率的な実装

### 3.4 useSubscription
**目的**: サブスクリプション状態管理

**機能**:
```typescript
interface UseSubscriptionReturn {
  subscription: Subscription | null;
  isLoading: boolean;
  error: Error | null;
  checkLimit: (feature: string) => boolean;
  upgradeRequired: boolean;
  cancelSubscription: () => Promise<void>;
}
```

### 3.5 useTheme
**目的**: テーマ設定の管理

**機能**:
```typescript
interface UseThemeReturn {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
}
```

**実装詳細**:
- システム設定の検出
- ローカルストレージへの永続化
- CSS変数の動的更新

## 4. Context Provider実装

### 4.1 AuthProvider
**目的**: 認証状態のグローバル管理

**提供データ**:
```typescript
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}
```

**実装場所**: `components/auth/AuthProvider.tsx`

### 4.2 SwrProvider
**目的**: SWRのグローバル設定

**実装場所**: `providers/SwrProvider.tsx`

## 5. ローカルストレージ管理

### 5.1 useLocalStorage
**目的**: ローカルストレージの型安全なラッパー

**機能**:
```typescript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void]
```

**使用例**:
- テーマ設定
- ユーザー設定
- 下書き保存
- UIステート

### 5.2 永続化データ
```typescript
// テーマ設定
localStorage.setItem('theme', 'dark');

// エディター設定
localStorage.setItem('editorSettings', JSON.stringify({
  fontSize: 14,
  wordWrap: true,
  autoSave: true
}));

// 下書き
localStorage.setItem('draft-{articleId}', JSON.stringify(draftData));
```

## 6. リアルタイムデータ同期

### 6.1 SSE/WebSocket統合（将来実装）
**目的**: リアルタイムコラボレーション

**計画機能**:
- 共同編集
- リアルタイム更新通知
- プレゼンス機能

### 6.2 ポーリング実装
**現在の実装**:
```typescript
// SWRの自動再検証
const { data } = useSWR('/api/articles', fetcher, {
  refreshInterval: 30000 // 30秒ごと
});
```

## 7. エラー処理とリカバリー

### 7.1 エラーバウンダリー
```typescript
class ErrorBoundary extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // エラーログ送信
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 7.2 APIエラーハンドリング
```typescript
// グローバルエラーハンドラー
const handleApiError = (error: ApiError) => {
  switch (error.statusCode) {
    case 401:
      // 認証エラー → ログイン画面へ
      router.push('/login');
      break;
    case 429:
      // レート制限 → 待機メッセージ
      showToast('リクエスト制限に達しました');
      break;
    default:
      // その他のエラー
      showToast(error.message);
  }
};
```

## 8. パフォーマンス最適化

### 8.1 データキャッシング戦略
- **SWRキャッシュ**: APIレスポンスの自動キャッシュ
- **メモ化**: 高コストな計算結果のキャッシュ
- **遅延読み込み**: 必要時のみデータ取得

### 8.2 状態更新の最適化
```typescript
// バッチ更新
const updateMultipleSections = useCallback((updates: SectionUpdate[]) => {
  // 一度に複数の更新を実行
  mutate(
    `/api/articles/${id}`,
    (current) => applyUpdates(current, updates),
    false
  );
}, [id]);

// デバウンス
const debouncedSave = useMemo(
  () => debounce(saveContent, 1000),
  [saveContent]
);
```

### 8.3 メモリ管理
- 履歴の最大保持数制限
- 不要なデータの定期クリーンアップ
- 大きなオブジェクトの参照管理

## 9. テストとデバッグ

### 9.1 状態のデバッグ
```typescript
// 開発環境でのデバッグツール
if (process.env.NODE_ENV === 'development') {
  window.__APP_STATE__ = {
    swrCache: cache,
    localStorage: { ...localStorage }
  };
}
```

### 9.2 テスト戦略
- カスタムフックのユニットテスト
- 統合テスト（データフロー全体）
- E2Eテスト（ユーザーシナリオ）