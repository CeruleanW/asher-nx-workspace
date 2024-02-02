import {Typography2} from '@root/shared/components/atomics/Typography';
// import React from 'react';
import { format } from '@root/shared/features/date';

/**
 * e.g. Last Update: 2022-10-30 10:31:34
 */
export function LastUpdateTime({ lastUpdateTime, ...optionals }) {
  return (
    <>
      <Typography2
        variant='subtitle1'
        display='block'
        gutterBottom
        color='textSecondary'
      >
        <div>Last Update:</div>
        {lastUpdateTime ? format(new Date(lastUpdateTime), 'yyyy-MM-dd HH:mm:ss') : 'No data'}
      </Typography2>
    </>
  )
}
