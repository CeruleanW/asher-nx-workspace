import React from 'react';
import MuiTypography from '@mui/material/Typography';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export function Typography(props) {
  return <p {...props} />;
}

export function Typography2(props) {
  return <MuiTypography {...props}/>
}

export function Subtitle2(props) {
  return <p className={'text-sm text-gray-500'} {...props} />;
}
