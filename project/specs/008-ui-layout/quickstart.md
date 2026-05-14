# Quickstart: Working with the App Shell

## Overview
The `AppShell` is the top-level component that wraps the entire application. It manages the global navigation, responsive breakpoints, and screen transitions.

## Adding a New Screen
To add a new view (e.g., "History Dashboard"), update the `AppShell` router/switcher:

1. Define the screen key in `types/layout.ts`.
2. Create your component in `components/`.
3. Add the component to the `AppShell` render logic.

## Using Responsive Utilities
Avoid hardcoding media queries. Use the `useBreakpoint` hook for logical branching:

```typescript
const { deviceType } = useBreakpoint();

if (deviceType === 'mobile') {
  return <MobileLayout />;
}
```

Or use Tailwind's responsive prefixes for styling:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Content -->
</div>
```

## Running Tests
Run responsive layout tests using Playwright:
```bash
npx playwright test tests/integration/responsive-layout.spec.ts
```
