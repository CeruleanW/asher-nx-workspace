import React from 'react';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

import Home from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SessionProvider session={null}>
        <Home />
      </SessionProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
