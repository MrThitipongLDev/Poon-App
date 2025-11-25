# Agent Guidelines for poon-app

## Commands
- **Dev**: `npm run dev` | **Build**: `npm run build` | **Start**: `npm run start`
- **Lint**: `npm run lint` | **Type check**: `npx tsc --noEmit`
- **Test**: No test framework configured (Playwright available)

## Code Style
- **Framework**: Next.js 16 + TypeScript strict + Tailwind CSS v4
- **Imports**: Type imports for Next.js, group external→local, use `@/*` aliases
- **Components**: PascalCase, explicit props types, `React.ReactNode` for children
- **Types**: Strict TS, interfaces for objects, explicit function signatures
- **Naming**: camelCase (vars/funcs), PascalCase (components/types), UPPER_SNAKE_CASE (consts)
- **Formatting**: 2-space indent, single quotes, semicolons, trailing commas
- **Error handling**: try/catch for async, descriptive errors, loading states