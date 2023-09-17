import React from 'react';
import ThemeProvider from './Theme';
import { AuthProvicder } from '@idea/features/auth/components/AuthProvicder';
import { SWRConfigProvider } from './swr';

/**
 * All provider components
 */
export function AppProvider(props) {
  return (
    <ThemeProvider>
      <AuthProvicder>
        <SWRConfigProvider>{props.children}</SWRConfigProvider>
      </AuthProvicder>
    </ThemeProvider>
  );
}
