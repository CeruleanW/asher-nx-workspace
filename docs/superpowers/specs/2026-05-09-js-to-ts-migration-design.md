# JavaScript → TypeScript migration

**Date:** 2026-05-09
**Status:** Design approved, awaiting spec review

## Goal

Convert all in-scope JavaScript source code in the `asher-nx-workspace` Nx monorepo to TypeScript with pragmatic type coverage. TypeScript is already configured (`allowJs: true`); this is a migration, not a fresh setup.

## Scope

**In scope (40 files):**

| Category | File extension transition |
|---|---|
| React components | `.jsx` → `.tsx` |
| Plain utilities, hooks, API routes | `.js` → `.ts` |
| Jest tests | `*.test.js` → `*.test.ts` / `*.test.tsx` |
| Storybook stories | `*.stories.js` → `*.stories.tsx` |
| MongoDB `$jsonSchema` validator files | `*.schema.js` → `*.schema.ts` (with co-located TS interface) |

**Out of scope:**

- Config files: `next.config.js`, `tailwind.config.js`, `sentry.{client,edge,server}.config.js`, `postcss.config.js`, `jest.preset.js`, per-app `jest.config.js`, `craco.config.js`. The tooling ecosystem still favors `.js` for these and the conversion benefit is low.
- Enabling `strict: true` in `tsconfig.base.json`.
- Refactoring component logic, removing dead code, or touching commented-out blocks.
- Library upgrades surfaced by typing (e.g., `@material-ui/core` v4 → `@mui/material` v5).
- Adding tests where none exist.
- The `personal-data` app — no `.js`/`.jsx` files in scope.

## Strictness level

**Pragmatic.** Add proper types for component props, function signatures, and return types. Use `any` only as a last resort for genuinely dynamic things (e.g., third-party libs without types, MongoDB validator JSON). Define shared interfaces for domain objects. `tsconfig.base.json` `strict` flag stays off.

## Migration order

Three groups, executed in order. Each group is verified before moving to the next.

### Group 1 — `libs/shared` (8 files)

Foundation; everything else depends on it.

- `libs/shared/src/lib/mocks/index.js` → `index.ts`
- `libs/shared/src/lib/mocks/configs.js` → `configs.ts`
- `libs/shared/src/lib/mocks/browser.js` → `browser.ts`
- `libs/shared/src/lib/mocks/handlers/handlers.js` → `handlers.ts`
- `libs/shared/src/features/date/foo.test.js` → `foo.test.ts`
- `libs/shared/src/components/template/PageTemplate/index.test.js` → `index.test.tsx`
- `libs/shared/src/components/pages/HomePage/index.test.js` → `index.test.tsx`
- `libs/shared/src/components/pages/HomePage/index.stories.js` → `index.stories.tsx`

### Group 2 — `apps/portfolio` (24 files)

CRA-style React app (uses craco).

- Root: `index.js`, `App.test.js`, `setupTests.js`, `reportWebVitals.js` → `.tsx`/`.ts`
- Lib/hooks: `hooks/index.js`, `lib/{constants,index,apis,easter-egg}.js`, `features/notification/index.js`, `pages/Resume/hooks.js` → `.ts`
- Components (12 `.jsx`): atomics (`DotBox`, `SVGLine`, `ScrollToTop`), molecules (`Description`, `CustomCard`, `NavTabs`), organisms (`Footer/Footer`, `Footer/FooterContent`), `styles/base/Theme.jsx` → `.tsx`
- Stories (3): `CustomCard.stories.js`, `Footer.stories.js`, `pages/Resume/components/ContactItem.stories.js` → `.tsx`

### Group 3 — `apps/idea-dropper` (8 files)

Next.js app.

- `components/FrameWrapper.jsx` → `.tsx`
- `lib/CONSTANTS.js`, `lib/dataProcess.js` → `.ts`
- `pages/api/user/id/[userid].js`, `pages/api/user/username/[username].js` → `.ts`
- `features/idea-server-backend/mongodbSchema/{user,box,card}.schema.js` → `.ts` with co-located TS interfaces

## Typing patterns

### React components (`.jsx` → `.tsx`)

- Define a `Props` interface per component.
- Replace `propTypes` and `defaultProps` with the TS interface plus default parameter values:
  ```ts
  function CustomCard({ bg = '/img/image-placeholder-gray.png', ...rest }: Props) { ... }
  ```
  Removing the runtime `prop-types` overhead is a side-benefit.
- Event handlers typed via React's built-in event types (`React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent`, etc.).
- `children` typed as `React.ReactNode` only when accepted.
- For `forwardRef` / `memo` wrappers, use the standard generic forms.

### Plain utilities (`.js` → `.ts`)

- Function parameters and return types annotated explicitly.
- Imported third-party values typed via published `@types/*` packages.
- Constants get `as const` where it adds literal narrowing; otherwise inferred.

### Tests (`*.test.js` → `*.test.ts` / `.tsx`)

- Light touch: rename and add types only where TS complains.
- Mocks (`jest.fn()`) typed via generic only where the mocked function's signature matters to assertions.

### Stories (`*.stories.js` → `*.stories.tsx`)

- Use Storybook's `Meta` and `StoryObj` types:
  ```ts
  const meta: Meta<typeof Component> = { ... };
  type Story = StoryObj<typeof Component>;
  export const Default: Story = { ... };
  ```

### `any` policy

- **Allowed for:** third-party library values lacking types, deeply dynamic data shapes, MongoDB `$jsonSchema` validator object literals.
- **Not allowed for:** component props, function signatures with known callers, domain entities.

### MongoDB schema files (revised after file inspection)

The three `*.schema.js` files in `idea-dropper` are MongoDB `$jsonSchema` validator objects, not Mongoose models. Pattern per file:

```ts
// user.schema.ts
export interface IUser {
  username: string;
  password: string;
  boxes: ObjectId[];
  owner: ObjectId;
  content: string;
  'created-date'?: Timestamp;
  'last-login-date'?: Timestamp;
  type?: string;
}

export const userSchema = {
  $jsonSchema: { /* unchanged */ },
};
```

`IUser` / `IBox` / `ICard` are the single source of truth for document shapes. API routes import them and type their `req` / `res` with `NextApiRequest` / `NextApiResponse<IUser>`.

The validator object itself stays as data; typing it loosely (or as `any`) is acceptable per the `any` policy.

## Verification per group

After each group, run typecheck + tests + (where applicable) build:

**Group 1 (`libs/shared`):**
- `npx tsc --noEmit -p libs/shared/tsconfig.lib.json`
- `npx nx test shared`
- Storybook spin-up only on request (slow).

**Group 2 (`apps/portfolio`):**
- `npx tsc --noEmit -p apps/portfolio/tsconfig.app.json`
- `npx nx test portfolio`
- `npm run build:portfolio` — full craco production build.

**Group 3 (`apps/idea-dropper`):**
- `npx tsc --noEmit -p apps/idea-dropper/tsconfig.json`
- `npx nx test idea-dropper` (skip cleanly if no test target).
- `npm run build:idea` — Next.js build, the realistic verification for API routes + components.

**Final cross-group sweep:**
- `npx nx run-many --target=build --all`.

**Failure handling:** if a group's verification fails, fix forward within that group before moving on. If a fix would balloon scope (e.g., a latent bug surfaced by stricter types), stop and surface it rather than silently widen the change.

## Risks and edge cases

1. **Import paths with explicit `.js` extensions** — if any file has `import x from './foo.js'`, the rename breaks it. Grep before each group; update as part of the group.
2. **Storybook glob coverage** — verify each project's `.storybook/main.{js,ts}` globs `*.stories.@(js|jsx|ts|tsx)` (or equivalent) before renaming stories. Widen the glob if needed.
3. **Jest config glob coverage** — verify `apps/portfolio/jest.config.js` and any other Jest config covers `.ts`/`.tsx` test files. Standard Nx Jest config does already; portfolio (CRA-style) may not.
4. **CRA + craco entry path** — confirm `craco.config.js` doesn't reference `index.js` by literal path before renaming `apps/portfolio/src/index.js`.
5. **`PropTypes` removal load-bearing in tests** — grep for `PropTypes` references in test files before removing. Unlikely but possible.
6. **Domain interfaces vs. real data drift** — interfaces reflect the validator schema, not necessarily prod data. Consumers should treat unknown fields defensively where it matters; note in code comments only where load-bearing.

## Rollback plan

Each group is committed as a single commit (`refactor(<scope>): convert JS to TS`). If a group breaks something post-merge that didn't surface in verification, `git revert <sha>` reverts just that group cleanly.

## Success criteria

- All 40 in-scope files renamed and typed per the patterns above.
- Per-group typecheck, tests, and build commands pass.
- Final `nx run-many --target=build --all` passes.
- No new `any` introduced outside the documented allowed cases.
- Three commits land cleanly on `main` (one per group).
