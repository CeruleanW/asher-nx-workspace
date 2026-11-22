import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthGate } from './features/supabase/AuthGate';

describe('App Component', () => {
  it('requires sign-in before showing portfolio content', () => {
    process.env.REACT_APP_SUPABASE_URL = 'https://example.supabase.co';
    process.env.REACT_APP_SUPABASE_ANON_KEY = 'test-anon-key';
    const { unmount } = render(<AuthGate><div>private portfolio</div></AuthGate>);
    expect(screen.getByRole('heading', { name: 'Sign in to view this portfolio' })).toBeInTheDocument();
    unmount();
  });
});
