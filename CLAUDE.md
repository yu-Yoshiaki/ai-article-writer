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

## Project Structure
```
/
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