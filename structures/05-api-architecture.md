# AI Article Writer - API アーキテクチャ要件定義

## 1. API設計概要

### 1.1 設計原則
- RESTfulな設計
- Next.js Route Handlers (App Router) 使用
- TypeScript による型安全性
- エラーハンドリングの統一
- 認証・認可の一貫性

### 1.2 共通仕様
- **ベースURL**: `/api`
- **レスポンス形式**: JSON
- **認証**: Firebase Authentication (Bearer Token)
- **エラーレスポンス**: 統一フォーマット
```typescript
{
  error: string;
  details?: any;
  statusCode: number;
}
```

## 2. 実装済みAPIエンドポイント

### 2.1 記事管理API

#### GET /api/articles
**目的**: 記事一覧の取得

**リクエスト**:
- Headers: `Authorization: Bearer {token}`
- Query Parameters:
  - `page`: ページ番号
  - `limit`: 1ページあたりの件数
  - `search`: 検索キーワード
  - `sort`: ソート順

**レスポンス**:
```typescript
{
  articles: Article[];
  total: number;
  page: number;
  totalPages: number;
}
```

#### POST /api/articles
**目的**: 新規記事の生成

**リクエスト**:
```typescript
{
  title: string;
  theme?: string;
  tone?: 'formal' | 'casual' | 'professional' | 'creative';
  sections?: string[];
}
```

**レスポンス**:
```typescript
{
  article: Article;
  generatedBy: 'ai' | 'template';
}
```

#### GET /api/articles/[id]
**目的**: 特定記事の取得

**レスポンス**:
```typescript
{
  article: Article;
  author: User;
  lastModified: string;
}
```

#### PUT /api/articles/[id]
**目的**: 記事の更新

**リクエスト**:
```typescript
{
  title?: string;
  sections?: Section[];
  theme?: Theme;
  seoScore?: SeoScore;
}
```

#### DELETE /api/articles/[id]
**目的**: 記事の削除

### 2.2 AI統合API

#### POST /api/chat
**目的**: AIアシスタントとのチャット

**リクエスト**:
```typescript
{
  message: string;
  context?: {
    articleId?: string;
    sectionId?: string;
    selectedText?: string;
  };
  history?: ChatMessage[];
}
```

**レスポンス**:
```typescript
{
  response: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
```

**実装詳細**:
- OpenAI GPT-3.5-turbo使用
- ストリーミングレスポンス対応
- コンテキスト aware な応答生成

### 2.3 サブスクリプションAPI

#### GET /api/subscription/[userId]
**目的**: ユーザーのサブスクリプション情報取得

**レスポンス**:
```typescript
{
  subscription: {
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
    currentPeriodEnd: string;
    usage: {
      articlesCreated: number;
      aiCallsUsed: number;
      storageUsed: number;
    };
  };
}
```

#### POST /api/subscription/[userId]/cancel
**目的**: サブスクリプションのキャンセル

**レスポンス**:
```typescript
{
  subscription: Subscription;
  cancellationDate: string;
}
```

### 2.4 ヘルスチェックAPI

#### GET /api/healthz
**目的**: サービスの稼働状況確認

**レスポンス**:
```typescript
{
  status: 'ok' | 'degraded' | 'down';
  version: string;
  timestamp: string;
  services: {
    database: 'ok' | 'error';
    openai: 'ok' | 'error';
    stripe: 'ok' | 'error';
  };
}
```

## 3. 内部サービス層

### 3.1 ArticleService
**場所**: `services/articleService.ts`

**主要メソッド**:
```typescript
- generateArticle(title: string, options: GenerateOptions): Promise<Article>
- generateVariations(section: Section, count: number): Promise<string[]>
- patchSection(content: string, action: PatchAction): Promise<string>
- analyzeSeo(article: Article): Promise<SeoScore>
```

### 3.2 ArticleApi
**場所**: `services/api/articleApi.ts`

**主要メソッド**:
```typescript
- fetchArticles(params: FetchParams): Promise<ArticleList>
- fetchArticle(id: string): Promise<Article>
- createArticle(data: CreateArticleData): Promise<Article>
- updateArticle(id: string, data: UpdateArticleData): Promise<Article>
- deleteArticle(id: string): Promise<void>
```

### 3.3 UserService
**場所**: `services/userService.ts`

**主要メソッド**:
```typescript
- getCurrentUser(): Promise<User>
- updateProfile(data: ProfileData): Promise<User>
- getUsageStats(): Promise<UsageStats>
```

## 4. データモデル

### 4.1 Article
```typescript
interface Article {
  id: string;
  title: string;
  theme: Theme;
  sections: Section[];
  tone: 'formal' | 'casual' | 'professional' | 'creative';
  seoScore?: SeoScore;
  createdAt: string;
  updatedAt: string;
  authorId: string;
}
```

### 4.2 Section
```typescript
interface Section {
  id: string;
  type: 'intro' | 'body' | 'conclusion';
  title: string;
  content: string;
  variations?: string[];
  order: number;
}
```

### 4.3 Theme
```typescript
interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}
```

### 4.4 SeoScore
```typescript
interface SeoScore {
  overall: number;
  factors: {
    titleOptimization: number;
    keywordDensity: number;
    readability: number;
    contentLength: number;
    headingStructure: number;
  };
  suggestions: string[];
}
```

## 5. エラーハンドリング

### 5.1 HTTPステータスコード
- 200: 成功
- 201: 作成成功
- 400: リクエストエラー
- 401: 認証エラー
- 403: 権限エラー
- 404: リソース未検出
- 429: レート制限
- 500: サーバーエラー

### 5.2 エラーレスポンス例
```typescript
// 認証エラー
{
  error: "Unauthorized",
  details: "Invalid or expired token",
  statusCode: 401
}

// バリデーションエラー
{
  error: "Validation Error",
  details: {
    field: "title",
    message: "Title is required"
  },
  statusCode: 400
}

// レート制限
{
  error: "Rate Limit Exceeded",
  details: {
    limit: 100,
    remaining: 0,
    resetAt: "2024-01-01T00:00:00Z"
  },
  statusCode: 429
}
```

## 6. セキュリティ

### 6.1 認証
- Firebase Authentication使用
- JWTトークン検証
- トークン有効期限チェック

### 6.2 認可
- ユーザーごとのリソースアクセス制御
- プランベースの機能制限
- 管理者権限チェック

### 6.3 入力検証
- Zodによるスキーマ検証
- SQLインジェクション対策
- XSS対策

### 6.4 レート制限
- IPベースの制限
- ユーザーベースの制限
- エンドポイント別の制限設定

## 7. パフォーマンス最適化

### 7.1 キャッシング
- SWRによるクライアントサイドキャッシュ
- Next.js Route Handlersのキャッシュ設定
- CDNキャッシュヘッダー

### 7.2 ページネーション
- カーソルベースページネーション
- 適切なページサイズ設定
- 総件数の効率的な取得

### 7.3 データベースクエリ最適化
- インデックスの適切な設定
- N+1問題の回避
- 必要なフィールドのみ取得

## 8. 外部サービス統合

### 8.1 OpenAI API
- GPT-3.5-turbo使用
- トークン使用量の追跡
- エラーハンドリング
- リトライロジック

### 8.2 Stripe API
- サブスクリプション管理
- 支払い処理
- Webhook統合
- 請求書生成

### 8.3 Firebase
- Authentication
- Firestore（将来実装）
- Cloud Storage（将来実装）