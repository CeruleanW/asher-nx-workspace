import React from 'react';
import ThemeProvider from './Theme';
import { AuthProvider } from '@idea/features/auth/components/AuthProvider';
import { SWRConfigProvider } from './swr';

/**
 * All provider components
 */
export function AppProvider(props) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SWRConfigProvider>{props.children}</SWRConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
