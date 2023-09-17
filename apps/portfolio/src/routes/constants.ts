const PAGE_WITHOUT_RESUME = [
  { path: '/', title: 'Home' },
  { path: '/projects', title: 'Projects' },
  { path: '/aboutme', title: 'About me' },
  { path: '/contact', title: 'Contact' },
];

export const PAGE_ROUTES =
  process.env.NODE_ENV === 'production'
    ? PAGE_WITHOUT_RESUME.map((r) => r.path)
    : ['/', '/projects', '/aboutme', '/contact', '/resume'];
export const PAGE_TITLES =
  process.env.NODE_ENV === 'production'
    ? PAGE_WITHOUT_RESUME.map((p) => p.title)
    : ['Home', 'Projects', 'About me', 'Contact', 'Resume'];
