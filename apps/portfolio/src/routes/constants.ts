// Pages shown in the navigation (tab bar on desktop, hamburger menu below 960px).
const NAV_PAGES = [
  { path: '/', title: 'Home' },
  { path: '/projects', title: 'Projects' },
  { path: '/aboutme', title: 'About me' },
  { path: '/contact', title: 'Contact' },
];

/**
 * Pages that have a registered route but are intentionally hidden from
 * navigation (both the desktop tab bar and the mobile hamburger menu).
 *
 * - Resume: protected by AuthGate (requires sign-in). It is NOT linked from
 *   the navigation in any environment — visit it directly at `/resume`.
 */
const HIDDEN_PAGES = [{ path: '/resume', title: 'Resume' }];

export const RESUME_ROUTE = HIDDEN_PAGES[0].path;

export const PAGE_ROUTES = NAV_PAGES.map((p) => p.path);
export const PAGE_TITLES = NAV_PAGES.map((p) => p.title);
