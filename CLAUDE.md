# AI Article Writer Project Guidelines

This document provides essential information for AI assistants working on this project.

## Project Overview

AI Article Writer is a Next.js application for creating and managing articles with AI assistance.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript (mandatory)
- **Styling**: Tailwind CSS with tailwindcss-animate
- **UI Components**: Radix UI
- **Editor**: Monaco Editor
- **Authentication**: Firebase Auth
- **Data Fetching**: SWR (mandatory for API data)
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React

## 🚀 使用方法

### 効率的な開発のための新構造

このプロジェクトでは、トークン効率を最大化し開発速度を向上させるため、機能別の実装ガイドとファイルマッピングシステムを導入しています。

#### 新機能実装時のワークフロー

1. **クイックリファレンス確認**
   - `structures/quick-reference.md` で開発フローを確認
2. **ファイルマッピング確認**
   - `structures/file-mapping.md` で影響するファイルを特定
   - 必要最小限のファイルのみに焦点を当てる
3. **実装ガイド参照**
   - `structures/implementation-guides/` で機能別の詳細ガイドを確認
   - 型定義、実装パターン、チェックリストを活用
4. **テンプレート使用**
   - `structures/implementation-templates/feature-template.md` をコピーして作業開始
5. **効率的な実装**
   - 特定されたファイルのみを編集
   - 大きな要件定義を読み込む必要なし

#### 利用可能なガイド

- **記事編集機能**: `structures/implementation-guides/article-editor-guide.md`
- **AI 支援機能**: `structures/implementation-guides/ai-assistance-guide.md`
- **認証機能**: `structures/implementation-guides/authentication-guide.md`
- **サブスクリプション機能**: `structures/implementation-guides/subscription-guide.md`

#### バグ修正・機能改善時

1. `structures/quick-reference.md` で関連ファイルを特定
2. `structures/file-mapping.md` で影響範囲を確認
3. 該当ファイルのみを修正

### 重要な利点

- **トークン効率**: 必要な情報のみを参照してコンテキストを最小化
- **開発速度**: 機能別ガイドで迷わず実装
- **保守性**: ファイルマッピングで影響範囲を明確化
- **一貫性**: テンプレートで統一された実装パターン

## Project Structure

```
/
├── structures/           # 効率的な開発のための要件定義
│   ├── implementation-guides/     # 機能別実装ガイド
│   ├── implementation-templates/  # 実装テンプレート
│   ├── file-mapping.md           # ファイルマッピング表
│   ├── quick-reference.md        # クイックリファレンス
│   └── 01-06-*.md               # 基本要件定義
├── app/          # Next.js app directory
├── components/   # Reusable React components
├── hooks/        # Custom React hooks
├── lib/          # Utilities and libraries
├── public/       # Static assets
├── styles/       # CSS/styling files
└── tasks/        # Task templates and documentation
```

## Development Guidelines

### 1. Coding Standards

- **TypeScript**: Always use TypeScript, minimize `any` usage
- **Data Access**: Use API Routes/Route Handlers for all data operations
- **Component Data**: Never access data directly from server components
- **State Management**: Use SWR for all API data fetching
- **Styling**: Use Tailwind CSS classes, avoid inline styles

### 2. Git Workflow

- **Development**: Work on `dev` branch
- **Features**: Create `feature/xxx` branches from `dev`
- **Bug Fixes**: Use `feature/bugfix-xxx` naming
- **Production**: `main` branch for releases only
- **Flow**: feature → dev (PR) → main (release)

### 3. Environment Variables

- Use `NEXT_PUBLIC_` prefix for client-side variables
- Firebase config: `NEXT_PUBLIC_FIREBASE_*`
- Access via `process.env` in Next.js

### 4. Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm run start`
- **Lint**: `npm run lint`
- **Type Check**: `npm run typecheck` (if available)

### 5. Testing & Quality

- Run lint before commits
- Ensure no TypeScript errors
- Test in both light and dark themes
- Verify responsive design

## File Naming Conventions

- Components: PascalCase (e.g., `ArticleEditor.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useArticle.ts`)
- Utilities: camelCase (e.g., `markdown.ts`)
- Types: PascalCase for interfaces/types

## Important Notes

- Package manager: npm (use package-lock.json)
- Always check existing patterns before implementing new features
- Follow established ESLint and Prettier configurations
- Use existing UI components from Radix UI when possible
- For icons, use Lucide React library

## Implementation Rules

**IMPORTANT**: All implementations MUST be based on tasks defined in the `/tasks/` directory.

- Never implement features without a corresponding task file
- Always check `/tasks/` directory before starting any implementation
- Follow the task template structure (概要、対象ファイル、ゴール)
- Create a new task file if one doesn't exist for the requested feature
- **MUST create a new feature branch for each task** (e.g., `feature/01-tailwind-configuration-fix`)
- Branch name should match the task file name
- Never work directly on `dev` or `main` branches

## Common Tasks

- See `/tasks/` directory for task templates
- Mark todos as completed immediately after finishing tasks
- Use SWR for data fetching, not direct fetch/useEffect
- Implement proper error handling and loading states

## Security

- Never commit sensitive data or API keys
- Use environment variables for configuration
- Validate all user inputs with Zod
- Implement proper authentication checks

This document should be updated as the project evolves.
