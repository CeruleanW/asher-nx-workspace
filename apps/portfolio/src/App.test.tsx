import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthGate, SessionProvider } from './features/supabase/AuthGate';

describe('App Component', () => {
  it('requires sign-in before showing protected content', () => {
    process.env.REACT_APP_SUPABASE_URL = 'https://example.supabase.co';
    process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-anon-key';
    const { unmount } = render(
      <SessionProvider>
        <AuthGate><div>protected content</div></AuthGate>
      </SessionProvider>
    );
    expect(screen.getByRole('heading', { name: 'Sign in to view this portfolio' })).toBeInTheDocument();
    expect(screen.queryByText('protected content')).not.toBeInTheDocument();
    unmount();
  });

  it('renders public pages without any sign-in requirement', () => {
    const { unmount } = render(
      <SessionProvider><div>public content</div></SessionProvider>
    );
    expect(screen.getByText('public content')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Sign in to view this portfolio' })).not.toBeInTheDocument();
    unmount();
  });
});
