# JavaScript → TypeScript Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all 40 in-scope JavaScript/JSX files in the `asher-nx-workspace` Nx monorepo to TypeScript with pragmatic type coverage, leaving config files (`*.config.js`) untouched.

**Architecture:** Three sequential groups (`libs/shared` → `apps/portfolio` → `apps/idea-dropper`), each verified with typecheck + tests + (where applicable) build before moving on. Each group lands as a single commit so it can be reverted independently. Pragmatic typing: `Props` interfaces for components, explicit signatures for utilities, shared interfaces for Mongo document shapes. `tsconfig.base.json` `strict` flag stays off.

**Tech Stack:** TypeScript 4.x, React 18, Next.js 13 (idea-dropper), CRA + craco (portfolio), Nx 15, Jest, MongoDB driver. Storybook is NOT installed in this repo — story files are orphan code that isn't run by any tooling.

**Spec:** `docs/superpowers/specs/2026-05-09-js-to-ts-migration-design.md`

---

## Pre-flight

### Task 1: Verify no `.js`-extension import paths exist

**Files:** none (read-only check)

- [ ] **Step 1: Grep for explicit `.js` imports under `apps/` and `libs/`**

Run:
```bash
grep -rn "from '\./.*\.js'\|from \"\./.*\.js\"\|from '\.\./.*\.js'\|from \"\.\./.*\.js\"" \
  apps libs \
  --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```

Expected: no output (already verified during planning, but the migration assumes this stays true).

- [ ] **Step 2: If matches appear, fix them inline**

For each match, edit the import to remove the `.js` extension. These edits land in whatever group's commit they belong to.

### Task 2: Verify Jest configs cover `.ts`/`.tsx` test files

**Files:** none (read-only check)

- [ ] **Step 1: Inspect each Jest config**

Read these files and confirm `moduleFileExtensions` (or equivalent) includes `'ts'` and `'tsx'`:
- `jest.preset.js` (root)
- `apps/portfolio/jest.config.js` — already verified during planning to list `['ts', 'tsx', 'js', 'jsx']`. Should pass.
- `apps/idea-dropper/jest.config.js` (if it exists)
- `libs/shared/jest.config.js` (if it exists)

Run:
```bash
ls jest.preset.js apps/*/jest.config.js libs/*/jest.config.js 2>/dev/null
```

- [ ] **Step 2: Widen any glob that does not include TS**

If any config restricts to `.js`/`.jsx`, add `'ts'` and `'tsx'`. Land this fix in the relevant group's commit.

### Task 3: Confirm Storybook story conversion expectations

**Files:** none (read-only check)

- [ ] **Step 1: Confirm Storybook is not installed**

Run:
```bash
grep -E '"@storybook/' package.json
```

Expected: no output (verified during planning).

- [ ] **Step 2: Note the implication for story conversion**

Story files will be converted to `.tsx` for consistency, but they cannot import types from `@storybook/react` because the package is not installed. Use the locally-defined type shape shown in story conversion tasks below. `HomePage/index.stories.js` has pre-existing broken imports (`storiesOf` from `@storybook/react`, `HomePage` from `'components'`); the conversion preserves the broken state with `// @ts-expect-error` markers per the design's "no logic refactor" rule.

---

## Group 1 — libs/shared (8 files)

### Task 4: Convert `libs/shared/src/lib/mocks/handlers/handlers.js`

**Files:**
- Rename: `libs/shared/src/lib/mocks/handlers/handlers.js` → `handlers.ts`

- [ ] **Step 1: Rename the file**

Run:
```bash
git mv libs/shared/src/lib/mocks/handlers/handlers.js libs/shared/src/lib/mocks/handlers/handlers.ts
```

- [ ] **Step 2: Type the export**

Replace the file body with:
```ts
import type { RequestHandler } from 'msw';

const allMocks: RequestHandler[] = [];

/**
 * All handlers for mocked API calls
 */
export const handlers = allMocks;
```

### Task 5: Convert `libs/shared/src/lib/mocks/browser.js`

**Files:**
- Rename: `libs/shared/src/lib/mocks/browser.js` → `browser.ts`

- [ ] **Step 1: Rename the file**

Run:
```bash
git mv libs/shared/src/lib/mocks/browser.js libs/shared/src/lib/mocks/browser.ts
```

- [ ] **Step 2: Type the export**

Replace the file body with:
```ts
import { setupWorker } from 'msw';
import { handlers } from './handlers/handlers';

// This configures a Service Worker with the given request handlers.
// export const worker = setupWorker(...handlers);

/**
 * start mocking
 */
export function initMock(): void {
  // mock APIs in local development environment
  console.debug('start mocking APIs');
  const worker = setupWorker(...handlers);
  worker.start({
    onUnhandledRequest: 'bypass',
  });
  return;
}
```

Note the import path stays `'./handlers/handlers'`. Unchanged from original (which imports from `'./handlers'` — resolves to the directory's `handlers.js`/`.ts`). If TS path resolution complains, change to `'./handlers/handlers'` explicitly. Verify by reading the original first.

### Task 6: Convert `libs/shared/src/lib/mocks/configs.js`

**Files:**
- Rename: `libs/shared/src/lib/mocks/configs.js` → `configs.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/lib/mocks/configs.js libs/shared/src/lib/mocks/configs.ts
```

- [ ] **Step 2: Type the constant**

Replace the file body with:
```ts
export interface MockConfig {
  configControl: {
    scanners: {
      useNoScanner: boolean;
    };
  };
}

export const CONFIG: MockConfig = {
  configControl: {
    scanners: {
      useNoScanner: false,
    },
  },
};
```

### Task 7: Convert `libs/shared/src/lib/mocks/index.js`

**Files:**
- Rename: `libs/shared/src/lib/mocks/index.js` → `index.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/lib/mocks/index.js libs/shared/src/lib/mocks/index.ts
```

- [ ] **Step 2: Re-export**

Replace the file body with:
```ts
/**
 * Mock APIs that take too long to get a response
 */
export { initMock } from './browser';
```

(Content unchanged; just the file extension.)

### Task 8: Convert `libs/shared/src/features/date/foo.test.js`

**Files:**
- Rename: `libs/shared/src/features/date/foo.test.js` → `foo.test.ts`

The sibling `foo.ts` already exists (verified during planning), so the import works extension-less.

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/features/date/foo.test.js libs/shared/src/features/date/foo.test.ts
```

- [ ] **Step 2: Add types where needed**

The existing test code uses `Date` objects and the imported functions are already typed via `foo.ts`. Most of the file works as-is. The only TS friction is the `let b;` and `let a;` declarations that get assigned inside `setTimeout`. Type them:

Replace:
```ts
const a = new Date();
let b;
```

With:
```ts
const a = new Date();
let b: Date | undefined;
```

Apply the same pattern to all four `let a` / `let b` declarations in this file. The rest of the file is unchanged.

### Task 9: Convert `libs/shared/src/components/template/PageTemplate/index.test.js`

**Files:**
- Rename: `libs/shared/src/components/template/PageTemplate/index.test.js` → `index.test.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/components/template/PageTemplate/index.test.js libs/shared/src/components/template/PageTemplate/index.test.tsx
```

- [ ] **Step 2: Type the wrap helper**

Replace:
```ts
const wrap = (props = {}) =>
  shallow(
    <PageTemplate header="header" footer="footer" {...props}>
      test
    </PageTemplate>
  );
```

With:
```ts
import type { ComponentProps } from 'react';

type WrapProps = Partial<ComponentProps<typeof PageTemplate>>;

const wrap = (props: WrapProps = {}) =>
  shallow(
    <PageTemplate header="header" footer="footer" {...props}>
      test
    </PageTemplate>
  );
```

Other lines in the file are JSX `it(...)` blocks that need no type changes.

- [ ] **Step 3: Note enzyme caveat**

If `enzyme` types are not installed (`@types/enzyme`), TS may complain on `mount`/`shallow`. Check:
```bash
grep -E '"@types/enzyme' package.json
```
If not present, leave the file as `.tsx` and add `// @ts-nocheck` at the top of the file as a last-resort exception (per design's `any` policy: third-party libs without types). Surface this to the user during verification rather than silently spreading `@ts-nocheck`.

### Task 10: Convert `libs/shared/src/components/pages/HomePage/index.test.js`

**Files:**
- Rename: `libs/shared/src/components/pages/HomePage/index.test.js` → `index.test.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/components/pages/HomePage/index.test.js libs/shared/src/components/pages/HomePage/index.test.tsx
```

- [ ] **Step 2: No type changes needed**

The file body is just `it('renders', () => { shallow(<HomePage />); });`. Same enzyme caveat from Task 9 applies; if `@types/enzyme` is missing, add `// @ts-nocheck` at the top of the file and surface to the user.

### Task 11: Convert `libs/shared/src/components/pages/HomePage/index.stories.js`

**Files:**
- Rename: `libs/shared/src/components/pages/HomePage/index.stories.js` → `index.stories.tsx`

This file has pre-existing broken imports (`storiesOf` from `@storybook/react` not installed; `HomePage` from `'components'` which is not a valid path). Per design, do not refactor — preserve the broken state and silence the typecheck.

- [ ] **Step 1: Rename**

Run:
```bash
git mv libs/shared/src/components/pages/HomePage/index.stories.js libs/shared/src/components/pages/HomePage/index.stories.tsx
```

- [ ] **Step 2: Mark the broken imports**

Replace the file body with:
```tsx
// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react';
// @ts-expect-error -- Storybook is not installed; this story file is orphan code preserved as-is per migration spec.
import { storiesOf } from '@storybook/react';
// @ts-expect-error -- 'components' is not a valid module path; preserved as-is per migration spec.
import { HomePage } from 'components';

storiesOf('HomePage', module).add('default', () => <HomePage />);
```

### Task 12: Verify Group 1 and commit

**Files:** none (verification + commit)

- [ ] **Step 1: Typecheck**

Run:
```bash
npx tsc --noEmit -p libs/shared/tsconfig.lib.json
```

Expected: PASS. If failures appear, fix them within Group 1 files only before proceeding.

- [ ] **Step 2: Run tests**

Run:
```bash
npx nx test shared
```

Expected: same pass/fail status as before the migration. The migration must not introduce new failures. (If pre-existing failures exist, surface to user; do not fix.)

- [ ] **Step 3: Commit**

Run:
```bash
git add -A libs/shared
git commit -m "$(cat <<'EOF'
refactor(shared): convert JS to TS

Renames 8 files (mocks, tests, story) from .js/.jsx to .ts/.tsx
and adds pragmatic type annotations per migration spec.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Group 2 — apps/portfolio (24 files)

### Task 13: Convert `apps/portfolio/src/lib/constants.js`

**Files:**
- Rename: `apps/portfolio/src/lib/constants.js` → `constants.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/lib/constants.js apps/portfolio/src/lib/constants.ts
```

- [ ] **Step 2: Add literal narrowing**

Replace the file body with:
```ts
export const FIRSTNAME = 'Asher';
export const LASTNAME = 'Yang';
export const FULLNAME = FIRSTNAME + ' ' + LASTNAME;
export const JOBTITLE = 'Web & Mobile Developer';
export const PAGE_ROUTES = ['/', '/projects', '/aboutme', '/contact', '/resume'] as const;
export const PAGE_TITLES = ['Home', 'Projects', 'About me', 'Contact', 'Resume'] as const;

export interface Route {
  path: string;
  title: string;
}
export const ROUTES: Route[] = [{ path: '/', title: 'Home' }];

// Statement of Originality: A paragraph stating that this is your work and that it is confidential. also indicate if any parts of the portfolio should not be copied.
export const STATEMENT = `This portfolio is the work of ${FULLNAME}. Please do not copy without permission. Some of the exhibits, work samples, and/or service samples are the proprietary property of the organization whose name appears on the document. Each has granted permission for this product to be used as a demonstration of my work`;

export const CONSTANTS = {
  FULLNAME,
  FIRSTNAME,
  LASTNAME,
} as const;
```

### Task 14: Convert `apps/portfolio/src/lib/apis.js`

**Files:**
- Rename: `apps/portfolio/src/lib/apis.js` → `apis.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/lib/apis.js apps/portfolio/src/lib/apis.ts
```

- [ ] **Step 2: No body changes needed**

The single export is `export const EMAILAPIURL = '...'`. TS infers `string`. Done.

### Task 15: Convert `apps/portfolio/src/lib/easter-egg.js`

**Files:**
- Rename: `apps/portfolio/src/lib/easter-egg.js` → `easter-egg.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/lib/easter-egg.js apps/portfolio/src/lib/easter-egg.ts
```

- [ ] **Step 2: Annotate return type**

Replace the file body with:
```ts
export const easterEgg = (): void => {
  console.log(
    `%cHi! I'm Asher. \nThanks for coming! `,
    'background: #222; color: #bada55; font-size: 2.6rem'
  );
};
```

### Task 16: Convert `apps/portfolio/src/lib/index.js`

**Files:**
- Rename: `apps/portfolio/src/lib/index.js` → `index.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/lib/index.js apps/portfolio/src/lib/index.ts
```

- [ ] **Step 2: No body changes needed**

The file is three re-exports. `fetcher.ts` already exists at the same path. Body remains:
```ts
export * from './easter-egg';
export * from './fetcher';
export * from './apis';
```

### Task 17: Convert `apps/portfolio/src/hooks/index.js`

**Files:**
- Rename: `apps/portfolio/src/hooks/index.js` → `index.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/hooks/index.js apps/portfolio/src/hooks/index.ts
```

- [ ] **Step 2: Add types**

Replace the file body with:
```ts
import { fetchProjectsData, PROJECTS_DATA_LINK, PERSONAL_DATA_LINK, fetchPersonalData } from '../lib';
import useSWR from 'swr';

interface Project {
  id: string;
  [key: string]: unknown;
}

interface ProjectsData {
  projects?: Project[];
}

interface UseProjectsDataResult {
  projectData: ProjectsData | undefined;
  error: unknown;
  isLoading: boolean;
}

export function useProjectsData(): UseProjectsDataResult {
  const { data, error } = useSWR<ProjectsData>(PROJECTS_DATA_LINK, fetchProjectsData);
  return { projectData: data, error, isLoading: !data && !error };
}

interface UseProjectDataByIDResult {
  projectData: Project | undefined;
  error: unknown;
  isLoading: boolean;
}

export function useProjectDataByID(id: string): UseProjectDataByIDResult {
  const { projectData, error, isLoading } = useProjectsData();
  let project: Project | undefined;
  if (projectData) {
    project = projectData?.projects?.find((p) => p.id === id);
  }

  return { projectData: project, error, isLoading };
}

export function usePersonalData(): { data: unknown; error: unknown; isLoading: boolean } {
  const { data, error } = useSWR(PERSONAL_DATA_LINK, fetchPersonalData);
  return { data, error, isLoading: !data && !error };
}
```

### Task 18: Convert `apps/portfolio/src/features/notification/index.js`

**Files:**
- Rename: `apps/portfolio/src/features/notification/index.js` → `index.ts`

- [ ] **Step 1: Read the file first**

Run:
```bash
cat apps/portfolio/src/features/notification/index.js
```

If empty or trivial, just rename. If non-trivial, apply the same patterns: explicit return types on functions, `Props`-style interfaces for any objects passed around.

- [ ] **Step 2: Rename**

Run:
```bash
git mv apps/portfolio/src/features/notification/index.js apps/portfolio/src/features/notification/index.ts
```

- [ ] **Step 3: Apply types as needed**

If types must be added, follow the patterns established in earlier tasks. If the file is empty/trivial, no changes beyond the rename.

### Task 19: Convert `apps/portfolio/src/pages/Resume/hooks.js`

**Files:**
- Rename: `apps/portfolio/src/pages/Resume/hooks.js` → `hooks.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/pages/Resume/hooks.js apps/portfolio/src/pages/Resume/hooks.ts
```

- [ ] **Step 2: No body changes needed**

The hook just delegates to `usePersonalData` (typed in Task 17). Body unchanged:
```ts
import { usePersonalData } from '@portfolio/hooks';

export function useResumeData() {
  return usePersonalData();
}
```

### Task 20: Convert `apps/portfolio/src/reportWebVitals.js`

**Files:**
- Rename: `apps/portfolio/src/reportWebVitals.js` → `reportWebVitals.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/reportWebVitals.js apps/portfolio/src/reportWebVitals.ts
```

- [ ] **Step 2: Type the perf entry callback**

Replace the file body with:
```ts
import type { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

If `ReportHandler` is not exported by the installed `web-vitals` version, fall back to `(metric: unknown) => void`.

### Task 21: Convert `apps/portfolio/src/setupTests.js`

**Files:**
- Rename: `apps/portfolio/src/setupTests.js` → `setupTests.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/setupTests.js apps/portfolio/src/setupTests.ts
```

- [ ] **Step 2: No body changes**

File body remains:
```ts
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
```

### Task 22: Convert `apps/portfolio/src/index.js`

**Files:**
- Rename: `apps/portfolio/src/index.js` → `index.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/index.js apps/portfolio/src/index.tsx
```

- [ ] **Step 2: Type the root render**

Replace the file body with:
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/base/global.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

`document.getElementById('root')` returns `HTMLElement | null`; `ReactDOM.render` accepts `Element | null`. No assertion needed.

### Task 23: Convert `apps/portfolio/src/App.test.js`

**Files:**
- Rename: `apps/portfolio/src/App.test.js` → `App.test.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/App.test.js apps/portfolio/src/App.test.tsx
```

- [ ] **Step 2: Type the wrapper**

Replace the file body with:
```tsx
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, ShallowWrapper } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });
});
```

If `@types/enzyme` is missing or `ShallowWrapper` doesn't import cleanly, replace `ShallowWrapper` with `any` and surface to user (per `any` policy: third-party libs without types).

### Task 24: Convert `apps/portfolio/src/styles/base/Theme.jsx`

**Files:**
- Rename: `apps/portfolio/src/styles/base/Theme.jsx` → `Theme.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/styles/base/Theme.jsx apps/portfolio/src/styles/base/Theme.tsx
```

- [ ] **Step 2: Type props**

At the bottom of the file, replace:
```tsx
export function Theme(props) {
  return <ThemeProvider theme={themeInstance}>{props.children}</ThemeProvider>;
}
```

With:
```tsx
import type { ReactNode } from 'react';

interface ThemeProps {
  children: ReactNode;
}

export function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={themeInstance}>{children}</ThemeProvider>;
}
```

The `themeConfig` object literal and the `themeInstance.typography.*` assignments above stay unchanged; MUI's `createTheme` accepts a loosely typed config. If TS complains about a specific palette key (e.g. the custom `result` palette), type the relevant assignment with `as const` or surface to the user — do not silently strip palette keys.

### Task 25: Convert `apps/portfolio/src/components/atomics/DotBox.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/atomics/DotBox.jsx` → `DotBox.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/atomics/DotBox.jsx apps/portfolio/src/components/atomics/DotBox.tsx
```

- [ ] **Step 2: No prop changes (component takes no props)**

Body unchanged. The `makeStyles((theme) => ...)` callback's `theme` parameter is typed by `@material-ui/core/styles` automatically. If TS infers `unknown`, type it as `(theme: any)` per the `any` policy (third-party legacy lib without strict types).

### Task 26: Convert `apps/portfolio/src/components/atomics/SVGLine.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/atomics/SVGLine.jsx` → `SVGLine.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/atomics/SVGLine.jsx apps/portfolio/src/components/atomics/SVGLine.tsx
```

- [ ] **Step 2: Type props**

Replace the file body with:
```tsx
import React from 'react';
import { grey } from '@root/shared/styles';

interface SVGLineProps {
  height: number | string;
}

export default function SVGLine({ height }: SVGLineProps) {
  // A simple horizontal line in SVG
  return (
    <svg height={height} width={80}>
      <g fill="none">
        <path stroke={grey[500]} d="M5 20 l215 0" />
      </g>
    </svg>
  );
}
```

### Task 27: Convert `apps/portfolio/src/components/atomics/ScrollToTop.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/atomics/ScrollToTop.jsx` → `ScrollToTop.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/atomics/ScrollToTop.jsx apps/portfolio/src/components/atomics/ScrollToTop.tsx
```

- [ ] **Step 2: Type the return**

Replace the file body with:
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop(): null {
  // auto scroll to the top when switching route, useful for react router
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
```

### Task 28: Convert `apps/portfolio/src/components/molecules/Description.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/molecules/Description.jsx` → `Description.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/molecules/Description.jsx apps/portfolio/src/components/molecules/Description.tsx
```

- [ ] **Step 2: Type props**

Replace the file body with:
```tsx
import React from 'react';
import type { ReactNode } from 'react';
import { Typography2 } from '@root/shared/components/atomics';

interface DescriptionProps {
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  text?: string;
  children?: ReactNode;
}

export default function Description({ align, text, children }: DescriptionProps) {
  return (
    <Typography2 color="textSecondary" align={align} paragraph>
      {text}
      {children}
    </Typography2>
  );
}
```

### Task 29: Convert `apps/portfolio/src/components/molecules/NavTabs.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/molecules/NavTabs.jsx` → `NavTabs.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/molecules/NavTabs.jsx apps/portfolio/src/components/molecules/NavTabs.tsx
```

- [ ] **Step 2: Type props and helper**

Replace the file body with:
```tsx
import { Tab, Tabs } from '@root/shared/components/atomics';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTab = styled(Tab)`
  font-family: 'Raleway', sans-serif;
  width: 9rem;
`;

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface NavTabsProps {
  routes: string[];
  value: string;
  labels: string[];
}

export default function NavTabs({ routes, value, labels }: NavTabsProps) {
  const allTabs = routes;

  const renderTabs = allTabs.map((route, index) => (
    <StyledTab
      label={labels[index]}
      value={route}
      component={Link}
      to={route}
      key={route}
      {...a11yProps(index)}
    />
  ));

  return (
    <Tabs value={value} centered aria-label="navigation tabs">
      {renderTabs}
    </Tabs>
  );
}
```

### Task 30: Convert `apps/portfolio/src/components/molecules/CustomCard.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/molecules/CustomCard.jsx` → `CustomCard.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/molecules/CustomCard.jsx apps/portfolio/src/components/molecules/CustomCard.tsx
```

- [ ] **Step 2: Replace propTypes/defaultProps with TS interface and default args**

Replace the file body with:
```tsx
import React from 'react';
import {
  Box,
  Typography2,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from '@root/shared/components/atomics';
import { Link } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: any) => ({
  card: {
    height: theme.spacing(49),
  },
  media: {
    width: '100%',
    paddingTop: '56.25%',
    backgroundSize: 'contain',
  },
  title: {},
  descrip: {
    opacity: 0.8,
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}));

interface CustomCardProps {
  title: string;
  subtitle?: string;
  bg?: string;
  image?: string;
  id?: string;
}

export default function CustomCard({
  title,
  subtitle,
  image,
  id,
  bg = '/img/image-placeholder-gray.png',
}: CustomCardProps) {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card}>
      <CardActionArea component={Link} to={`/projects/${id}`}>
        <CardMedia
          className={classes.media}
          image={image}
          cover={true}
          title={title}
        />
        <CardContent>
          <Box className={classes.title}>
            <Typography2 gutterBottom variant="h5" component={'h2'} align="center">
              {title}
            </Typography2>
          </Box>
          <Box>
            <Typography2
              variant="body2"
              color="textPrimary"
              component="p"
              className={classes.descrip}
              align="center"
            >
              {subtitle}
            </Typography2>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
```

Note the removed `prop-types` import and the removed `CustomCard.propTypes` / `CustomCard.defaultProps` blocks. Default for `bg` moved to the destructured parameter.

### Task 31: Convert `apps/portfolio/src/components/organisms/Footer/Footer.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/organisms/Footer/Footer.jsx` → `Footer.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/organisms/Footer/Footer.jsx apps/portfolio/src/components/organisms/Footer/Footer.tsx
```

- [ ] **Step 2: No prop changes (component takes no props)**

Body unchanged. The `import styles from './Footer.module.scss'` already works because Nx is configured for CSS modules.

### Task 32: Convert `apps/portfolio/src/components/organisms/Footer/FooterContent.jsx`

**Files:**
- Rename: `apps/portfolio/src/components/organisms/Footer/FooterContent.jsx` → `FooterContent.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/organisms/Footer/FooterContent.jsx apps/portfolio/src/components/organisms/Footer/FooterContent.tsx
```

- [ ] **Step 2: Type props**

Replace the file body with:
```tsx
import React from 'react';
import styles from './Footer.module.scss';

interface FooterContentProps {
  owner: string;
  url: string;
  year: string;
}

export default function FooterContent({ owner, url, year }: FooterContentProps) {
  return (
    <div>
      <p className={styles.text}>
        Copyright &copy; {year} Developed with ❤️ by{' '}
        <a className={styles.footerLink} href={url}>
          {owner}
        </a>
      </p>
    </div>
  );
}
```

### Task 33: Convert `apps/portfolio/src/components/molecules/CustomCard.stories.js`

**Files:**
- Rename: `apps/portfolio/src/components/molecules/CustomCard.stories.js` → `CustomCard.stories.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/molecules/CustomCard.stories.js apps/portfolio/src/components/molecules/CustomCard.stories.tsx
```

- [ ] **Step 2: Use minimal local types (Storybook not installed)**

Replace the file body with:
```tsx
import React from 'react';
import CustomCard from './CustomCard';

interface StoryMeta {
  component: React.ComponentType<unknown>;
  title: string;
}

interface StoryFn {
  (args: Record<string, unknown>): JSX.Element;
  bind: (thisArg: unknown) => StoryFn;
  args?: Record<string, unknown>;
}

const meta: StoryMeta = {
  component: CustomCard,
  title: 'Storybook2',
};

export default meta;

const Template: StoryFn = ((args: Record<string, unknown>) => <CustomCard {...(args as any)} />) as StoryFn;

const project1 = {
  title: 'Landing Page - Broken Dream Café',
  description:
    'A responsive design landing page for a non-existing restaurant, using React.js, Semantic UI React, and CSS Module',
  bg: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
};

export const Default = Template.bind({});
Default.args = { ...project1 };

export const Pinned = Template.bind({});
Pinned.args = {};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...(Default.args?.task as object | undefined),
    state: 'TASK_ARCHIVED',
  },
};
```

Note import path changed from `'./CustomCard.jsx'` to `'./CustomCard'` since the file is now `.tsx`.

### Task 34: Convert `apps/portfolio/src/components/organisms/Footer/Footer.stories.js`

**Files:**
- Rename: `apps/portfolio/src/components/organisms/Footer/Footer.stories.js` → `Footer.stories.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/components/organisms/Footer/Footer.stories.js apps/portfolio/src/components/organisms/Footer/Footer.stories.tsx
```

- [ ] **Step 2: Type the meta**

Replace the file body with:
```tsx
import React from 'react';
import Footer from './Footer';

interface StoryMeta {
  title: string;
  component: React.ComponentType<unknown>;
}

const meta: StoryMeta = {
  title: 'Footer',
  component: Footer,
};

export default meta;

export const Primary = (): JSX.Element => <Footer />;
```

### Task 35: Convert `apps/portfolio/src/pages/Resume/components/ContactItem.stories.js`

**Files:**
- Rename: `apps/portfolio/src/pages/Resume/components/ContactItem.stories.js` → `ContactItem.stories.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/portfolio/src/pages/Resume/components/ContactItem.stories.js apps/portfolio/src/pages/Resume/components/ContactItem.stories.tsx
```

- [ ] **Step 2: Type meta and Template**

Replace the file body with:
```tsx
import React from 'react';
import ContactItem from './ContactItem';

interface StoryMeta {
  component: React.ComponentType<unknown>;
  title: string;
}

interface StoryFn {
  (args: Record<string, unknown>): JSX.Element;
  bind: (thisArg: unknown) => StoryFn;
  args?: Record<string, unknown>;
}

const meta: StoryMeta = {
  component: ContactItem,
  title: 'contact item',
};

export default meta;

const Template: StoryFn = ((args: Record<string, unknown>) => <ContactItem {...(args as any)} />) as StoryFn;

export const Default = Template.bind({});
Default.args = {};

export const Phone = Template.bind({});
Phone.args = {
  type: 'phone',
  children: '55555555',
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  children: 'sdfsdf@gasdf.com',
};
```

### Task 36: Verify Group 2 and commit

**Files:** none (verification + commit)

- [ ] **Step 1: Typecheck**

Run:
```bash
npx tsc --noEmit -p apps/portfolio/tsconfig.app.json
```

Expected: PASS. If failures appear, fix within Group 2 files. Common issues to expect:
- Missing `@types/enzyme` → use `// @ts-nocheck` in affected test files; surface to user.
- `web-vitals` `ReportHandler` not exported → fall back to `(metric: unknown) => void`.
- MUI v4 `theme` typing weakness → use `(theme: any)` per `any` policy.

- [ ] **Step 2: Run tests**

Run:
```bash
npx nx test portfolio
```

Expected: same pass/fail status as before the migration.

- [ ] **Step 3: Build**

Run:
```bash
npm run build:portfolio
```

Expected: PASS. craco production build completes.

- [ ] **Step 4: Commit**

Run:
```bash
git add -A apps/portfolio
git commit -m "$(cat <<'EOF'
refactor(portfolio): convert JS to TS

Renames 24 files (CRA root, lib, hooks, components, stories, tests)
from .js/.jsx to .ts/.tsx and adds pragmatic type annotations per
migration spec. Replaces prop-types with TS interfaces.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Group 3 — apps/idea-dropper (8 files)

### Task 37: Convert `apps/idea-dropper/src/lib/CONSTANTS.js`

**Files:**
- Rename: `apps/idea-dropper/src/lib/CONSTANTS.js` → `CONSTANTS.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/lib/CONSTANTS.js apps/idea-dropper/src/lib/CONSTANTS.ts
```

- [ ] **Step 2: No body changes**

Body unchanged:
```ts
export const APPNAME = 'Idea Droper';

export const PAGETITLE = APPNAME;
```

### Task 38: Convert `apps/idea-dropper/src/lib/dataProcess.js`

**Files:**
- Rename: `apps/idea-dropper/src/lib/dataProcess.js` → `dataProcess.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/lib/dataProcess.js apps/idea-dropper/src/lib/dataProcess.ts
```

- [ ] **Step 2: Annotate the empty function**

Replace the file body with:
```ts
export function parseJSON(): void {}
```

(Function was previously not exported. If callers exist that expect non-export, surface to user — `grep -r "parseJSON" apps libs` and confirm. Otherwise, exporting it is safe and matches its declaration intent.)

Actually, run the grep first:
```bash
grep -rn "parseJSON" apps libs --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

If no callers exist outside this file, prefer the safer minimal change:
```ts
function parseJSON(): void {}

export {};
```

The `export {}` keeps the file as a module without exporting anything. Match the original behavior.

### Task 39: Convert `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/user.schema.js`

**Files:**
- Rename: `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/user.schema.js` → `user.schema.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/user.schema.js apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/user.schema.ts
```

- [ ] **Step 2: Add interface and export**

Replace the file body with:
```ts
import type { ObjectId, Timestamp } from 'mongodb';

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

// name, password,
export const userSchema = {
  $jsonSchema: {
    required: ['username', 'password', 'boxes', 'owner', 'content'],
    properties: {
      username: { bsonType: 'string' },
      password: { bsonType: 'string' },
      boxes: { bsonType: ['array'], items: { bsonType: 'objectId' } },
      'created-date': {
        bsonType: 'timestamp',
      },
      'last-login-date': { bsonType: 'timestamp' },
      type: { bsonType: 'string' },
    },
  },
};
```

Note: the original file declared `const schema` without exporting it. Change name to `userSchema` and export it. Run a grep for `user.schema` consumers first:
```bash
grep -rn "user\.schema" apps libs --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

If consumers expect a default export named `schema`, also add `export default userSchema;`. Otherwise, named export is sufficient.

### Task 40: Convert `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/box.schema.js`

**Files:**
- Rename: `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/box.schema.js` → `box.schema.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/box.schema.js apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/box.schema.ts
```

- [ ] **Step 2: Add interface and export**

Replace the file body with:
```ts
import type { ObjectId, Timestamp } from 'mongodb';

export interface IBox {
  name: string;
  tags?: string[];
  'created-date': Timestamp;
  'last-updated-date': Timestamp;
  'last-access-date': Timestamp;
  size: number;
  cards?: ObjectId[];
  owner: ObjectId;
  sharedWith?: ObjectId[];
  drawSequence?: number;
}

export const boxSchema = {
  $jsonSchema: {
    required: ['name', 'created-date', 'last-updated-date', 'last-access-date', 'size', 'owner'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      tags: {
        bsonType: ['array'],
        items: 'string',
      },
      'created-date': {
        bsonType: 'timestamp',
      },
      'last-updated-date': { bsonType: 'timestamp' },
      'last-access-date': { bsonType: 'timestamp' },
      size: {
        bsonType: 'int',
      },
      cards: {
        bsonType: ['array'],
        items: 'objectId',
      },
      owner: { bsonType: 'objectId' },
      sharedWith: {
        bsonType: ['array'],
        items: 'objectId',
      },
      drawSequence: {
        bsonType: 'int',
      },
    },
  },
};
```

Same consumer-grep + optional `default` export note as Task 39.

### Task 41: Convert `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/card.schema.js`

**Files:**
- Rename: `apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/card.schema.js` → `card.schema.ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/card.schema.js apps/idea-dropper/src/features/idea-server-backend/mongodbSchema/card.schema.ts
```

- [ ] **Step 2: Add interface and export**

Replace the file body with:
```ts
import type { ObjectId } from 'mongodb';

export interface ICard {
  'created-date': Date;
  'last-updated-date': Date;
  'last-access-date': Date;
  owner: ObjectId;
  content: string;
  title?: string;
  boxes?: string;
}

export const cardSchema = {
  $jsonSchema: {
    required: [
      'created-date',
      'last-updated-date',
      'last-access-date',
      'owner',
      'content',
    ],
    properties: {
      'created-date': { bsonType: 'date' },
      'last-updated-date': { bsonType: 'date' },
      'last-access-date': { bsonType: 'date' },
      owner: { bsonType: 'objectId' },
      title: { bsonType: 'string' },
      boxes: { bsonType: 'string' },
    },
  },
};
```

Note `boxes` is typed `string` (not `string[]`) because the schema validator declares `bsonType: 'string'`. This may be a pre-existing bug in the validator; do not fix it here per the design's no-logic-refactor rule. Surface to user post-migration if interesting.

Same consumer-grep + optional `default` export note as Task 39.

### Task 42: Convert `apps/idea-dropper/src/pages/api/user/id/[userid].js`

**Files:**
- Rename: `apps/idea-dropper/src/pages/api/user/id/[userid].js` → `[userid].ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv "apps/idea-dropper/src/pages/api/user/id/[userid].js" "apps/idea-dropper/src/pages/api/user/id/[userid].ts"
```

- [ ] **Step 2: Type the Next.js handler**

Replace the file body with:
```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@root/shared/features/mongodb';
import { ObjectId } from 'mongodb';
import { USERS_COLLECTION } from '@idea/features/idea-server-backend';
import type { IUser } from '@idea/features/idea-server-backend/mongodbSchema/user.schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | null>
) {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { userid } = req.query || {};
  console.debug('userid', userid);

  // return the user document
  const userCursor = await db
    .collection(USERS_COLLECTION)
    .findOne({ _id: new ObjectId(userid as string) });

  res.json(userCursor as IUser | null);
}
```

Two notable changes from the original:
1. `ObjectId(userid)` becomes `new ObjectId(userid as string)` — `mongodb` v4+ requires `new`.
2. `req.query.userid` is `string | string[] | undefined`; cast to `string` since the route param is single-valued.

If the `IUser` import path resolution fails because the schema file is not re-exported from `@idea/features/idea-server-backend/index.ts`, import directly via the relative path:
```ts
import type { IUser } from '../../../../features/idea-server-backend/mongodbSchema/user.schema';
```

### Task 43: Convert `apps/idea-dropper/src/pages/api/user/username/[username].js`

**Files:**
- Rename: `apps/idea-dropper/src/pages/api/user/username/[username].js` → `[username].ts`

- [ ] **Step 1: Rename**

Run:
```bash
git mv "apps/idea-dropper/src/pages/api/user/username/[username].js" "apps/idea-dropper/src/pages/api/user/username/[username].ts"
```

- [ ] **Step 2: Type the handler**

Replace the file body with:
```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@root/shared/features/mongodb';
import type { IUser } from '@idea/features/idea-server-backend/mongodbSchema/user.schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | null>
) {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { username } = req.query || {};
  console.debug('username', username);

  // return the user document
  const userCursor = await db
    .collection('user')
    .findOne({ username: username as string });

  // userCursor && userCursor.forEach(iterateFunc, errorFunc);

  res.json(userCursor as IUser | null);
}
```

Same `IUser` import-path fallback note as Task 42.

### Task 44: Convert `apps/idea-dropper/src/components/FrameWrapper.jsx`

**Files:**
- Rename: `apps/idea-dropper/src/components/FrameWrapper.jsx` → `FrameWrapper.tsx`

- [ ] **Step 1: Rename**

Run:
```bash
git mv apps/idea-dropper/src/components/FrameWrapper.jsx apps/idea-dropper/src/components/FrameWrapper.tsx
```

- [ ] **Step 2: Type props**

Replace the file body with:
```tsx
import type { ReactNode } from 'react';
// import { useState } from 'react';
// import Footer from './Footer/Footer';
// import { SideMenu } from './SideMenu';
// import { Nav } from './Nav';
// import Tabs from './Tabs';
// import Tab from './Tab';

const tabTypes = ['box', 'add', 'board'] as const;

interface FrameWrapperProps {
  title: string;
  children?: ReactNode;
  activeTab?: (typeof tabTypes)[number];
}

export function FrameWrapper({ title, children, activeTab, ...rest }: FrameWrapperProps) {
  // const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="w-full">
          {/* <Nav
            isMenuOpened={isMenuOpened}
            setIsMenuOpened={setIsMenuOpened}
            title={title}
          /> */}
        </header>
        <div className="flex flex-1 justify-start">
          {/* {isMenuOpened ? <SideMenu /> : null} */}
          {children}
        </div>
        {/* <Tabs>
          {tabTypes.map( (type, index) => <Tab type={type} active={type === activeTab} key={`tab-${index}`} />)}
        </Tabs> */}
        {/* <Footer /> */}
      </div>
    </>
  );
}
```

Note `tabTypes` was previously declared but unused in the active code path. Kept as `const` per the design's no-dead-code-removal rule. The commented-out blocks stay commented.

### Task 45: Verify Group 3 and commit

**Files:** none (verification + commit)

- [ ] **Step 1: Typecheck**

Run:
```bash
npx tsc --noEmit -p apps/idea-dropper/tsconfig.json
```

Expected: PASS. If `IUser`/`IBox`/`ICard` import paths fail, switch to relative imports as noted in Tasks 42–43.

- [ ] **Step 2: Run tests**

Run:
```bash
npx nx test idea-dropper 2>&1 || echo "No test target — skipping"
```

Expected: same pass/fail status as before the migration, OR the target does not exist (acceptable per design).

- [ ] **Step 3: Build**

Run:
```bash
npm run build:idea
```

Expected: Next.js build PASSES. This is the realistic verification for API routes + components.

- [ ] **Step 4: Commit**

Run:
```bash
git add -A apps/idea-dropper
git commit -m "$(cat <<'EOF'
refactor(idea-dropper): convert JS to TS

Renames 8 files (lib, schemas, API routes, FrameWrapper) from
.js/.jsx to .ts/.tsx, adds shared TS interfaces (IUser, IBox, ICard)
co-located with each $jsonSchema validator, and types Next.js
NextApiRequest/NextApiResponse generics in the API routes.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Final cross-group sweep

### Task 46: Run full workspace build and surface results

**Files:** none (verification only)

- [ ] **Step 1: Cross-project build**

Run:
```bash
npx nx run-many --target=build --all
```

Expected: all builds pass. If a build fails for `personal-data` (which has no JS files in scope), that's a pre-existing failure unrelated to this migration — surface to user, do not fix.

- [ ] **Step 2: Run all tests**

Run:
```bash
npx nx run-many --target=test --all
```

Expected: same pass/fail status as before the migration. New failures must be diagnosed and fixed within the relevant group (which may require a follow-up commit).

- [ ] **Step 3: Final reporting to user**

Summarize for the user:
- Number of files converted (should be 40).
- Three commits created (`refactor(shared)`, `refactor(portfolio)`, `refactor(idea-dropper)`).
- Any pre-existing failures surfaced (broken story imports, MUI v4 typing weakness, missing `@types/enzyme`, etc.).
- Whether `npm run build:portfolio` and `npm run build:idea` passed.

Do not push commits to the remote unless the user explicitly asks.

---

## Self-review notes (for plan author, before handoff)

- **Spec coverage:** all 40 files in the spec's three groups appear in Tasks 4–11, 13–35, 37–44. Pre-flight Tasks 1–3 cover the spec's "Risks and edge cases" section. Final sweep (Task 46) covers the spec's "Final cross-group sweep" verification.
- **Type consistency:** `IUser` (Task 39) is referenced by `[userid].ts` (Task 42) and `[username].ts` (Task 43). `boxSchema`/`cardSchema` named exports are consistent across schema tasks. Story `StoryFn` / `StoryMeta` shapes are duplicated across stories tasks intentionally (the engineer may run tasks out of order).
- **Out of scope respected:** Tasks do not touch `*.config.js`, do not enable `strict: true`, do not remove dead code (e.g., `tabTypes` in FrameWrapper kept as-is, `parseJSON` non-export preserved when no callers found), and do not refactor pre-existing bugs (e.g., `card.schema` `boxes: string` validator, broken `HomePage/index.stories.js` imports).
