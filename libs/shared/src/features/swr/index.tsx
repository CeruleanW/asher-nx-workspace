// import React from 'react';
import { SWRConfig } from 'swr';
import { getData } from '@root/shared/features/axios';

export function SWRConfigProvider({ children, ...optionals }) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: getData,
          // refreshInterval: 4000,
        }}
      >
        {children ? children : null}
      </SWRConfig>
    </>
  );
}
