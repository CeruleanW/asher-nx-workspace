import React from 'react';
import { SWRConfig } from 'swr';

/**
 *
 */
export function SWRConfigProvider({ children, ...optionals }) {

  return (
    <SWRConfig>
      {children ? children : null}
    </SWRConfig>
  );
}
