# ファイルマッピング表

このファイルは、各機能がどのファイルに影響するかを明確にするためのマッピング表です。

## 機能別ファイルマッピング

### 🎯 記事編集機能

```
影響ファイル:
├── src/app/editor/page.tsx                    # メインエディターページ
├── src/components/editor/
│   ├── ArticleEditor.tsx                      # エディターコンポーネント
│   ├── SectionManager.tsx                     # セクション管理
│   └── PreviewPanel.tsx                       # プレビューパネル
├── src/hooks/
│   ├── useArticle.ts                          # 記事データ管理
│   └── useEditor.ts                           # エディター状態管理
├── src/services/articleService.ts             # 記事関連API
├── src/types/article.ts                       # 記事型定義
└── src/app/api/articles/                      # 記事API
```

### 🤖 AI 支援機能

```
影響ファイル:
├── src/app/api/ai/
│   ├── generate/route.ts                      # 記事生成API
│   ├── patch/route.ts                         # パッチ生成API
│   └── analyze/route.ts                       # 分析API
├── src/components/ai/
│   ├── AIAssistant.tsx                        # AIアシスタント
│   ├── PatchSuggestions.tsx                   # パッチ提案
│   └── GenerationDialog.tsx                   # 生成ダイアログ
├── src/services/aiService.ts                  # AI関連サービス
├── src/hooks/useAI.ts                         # AI機能フック
└── src/types/ai.ts                            # AI型定義
```

### 🔐 認証機能

```
影響ファイル:
├── src/app/(auth)/
│   ├── login/page.tsx                         # ログインページ
│   ├── register/page.tsx                      # 登録ページ
│   └── profile/page.tsx                       # プロファイルページ
├── src/components/auth/
│   ├── LoginForm.tsx                          # ログインフォーム
│   ├── RegisterForm.tsx                       # 登録フォーム
│   └── PrivateRoute.tsx                       # ルート保護
├── src/hooks/useAuth.ts                       # 認証フック
├── src/services/authService.ts                # 認証サービス
├── src/lib/firebase.ts                        # Firebase設定
└── src/types/auth.ts                          # 認証型定義
```

### 💳 サブスクリプション機能

```
影響ファイル:
├── src/app/subscription/page.tsx              # サブスクリプションページ
├── src/app/api/stripe/
│   ├── create-checkout/route.ts               # チェックアウト作成
│   ├── webhook/route.ts                       # Webhookハンドラー
│   └── portal/route.ts                        # カスタマーポータル
├── src/components/subscription/
│   ├── PricingTable.tsx                       # 料金表
│   ├── SubscriptionStatus.tsx                 # ステータス表示
│   └── UsageTracker.tsx                       # 使用量追跡
├── src/hooks/useSubscription.ts               # サブスクリプションフック
├── src/services/stripeService.ts              # Stripe関連サービス
└── src/types/subscription.ts                  # サブスクリプション型定義
```

### 📊 SEO 分析機能

```
影響ファイル:
├── src/components/seo/
│   ├── SEOAnalyzer.tsx                        # SEO分析コンポーネント
│   ├── KeywordAnalysis.tsx                    # キーワード分析
│   └── SEOScore.tsx                           # SEOスコア表示
├── src/services/seoService.ts                 # SEO分析サービス
├── src/hooks/useSEO.ts                        # SEO分析フック
├── src/types/seo.ts                           # SEO型定義
└── src/app/api/seo/analyze/route.ts           # SEO分析API
```

### 🎨 UI コンポーネント

```
影響ファイル:
├── src/components/ui/                         # 基本UIコンポーネント
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
├── src/components/layout/
│   ├── Header.tsx                             # ヘッダー
│   ├── Sidebar.tsx                            # サイドバー
│   └── Footer.tsx                             # フッター
└── src/lib/utils.ts                           # ユーティリティ関数
```

## 共通影響ファイル

これらのファイルは複数の機能で共有されます：

```
共通ファイル:
├── src/app/layout.tsx                         # ルートレイアウト
├── src/app/globals.css                        # グローバルスタイル
├── src/lib/
│   ├── firebase.ts                            # Firebase設定
│   ├── stripe.ts                              # Stripe設定
│   └── utils.ts                               # 共通ユーティリティ
├── src/types/
│   ├── index.ts                               # 共通型定義
│   └── api.ts                                 # API型定義
└── src/hooks/
    ├── useLocalStorage.ts                     # ローカルストレージ
    └── useDebounce.ts                         # デバウンス
```

## 使用方法

1. **新機能実装時**: 該当する機能のファイルリストを確認
2. **バグ修正時**: 影響範囲を特定
3. **リファクタリング時**: 関連ファイルを一括で確認

## 更新ルール

- 新しいファイルを追加した場合は、このマッピング表を更新
- 機能の移動や削除があった場合も同様に更新
- 定期的にファイル構造との整合性をチェック
