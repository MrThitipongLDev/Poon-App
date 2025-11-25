# Agent Guidelines for poon-app

## Commands
- **Dev**: `npm run dev` | **Build**: `npm run build` | **Start**: `npm run start`
- **Lint**: `npm run lint` | **Type check**: `npx tsc --noEmit`
- **Test**: No test framework configured (Playwright available)

## Code Style
- **Framework**: Next.js 16 + TypeScript strict + Tailwind CSS v4
- **Imports**: Type imports for React/Next.js, group external→local, use `@/*` aliases
- **Components**: PascalCase, explicit props interfaces, `React.ReactNode` for children
- **Types**: Strict TS, interfaces for objects, explicit return types, avoid `any`
- **Naming**: camelCase (vars/funcs), PascalCase (components/types), UPPER_SNAKE_CASE (consts)
- **Formatting**: 2-space indent, single quotes, semicolons, trailing commas
- **Error handling**: try/catch for async, descriptive errors, loading states

## Project-Specific Guidelines
- **Inventory System**: Product management with expiry tracking, batch numbers, low stock alerts
- **Expiry Logic**: Use `getExpiryStatus()` utility for consistent expiry calculations
- **Navigation**: Use Next.js Link for navigation, avoid programmatic routing when possible
- **Data**: Mock data in `lib/data.ts`, types in `lib/types.ts`, utilities in `lib/utils.ts`
- **UI Components**: Use components from `components/ui/` for consistent styling
- **Suspense**: Wrap `useSearchParams()` in Suspense boundaries for client components
- **Dynamic Routes**: Use `[id]` pattern for product detail/edit pages
- **Thai Language**: All UI text in Thai, use `lang="th"` in HTML