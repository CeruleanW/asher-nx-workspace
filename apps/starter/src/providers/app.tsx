import React from 'react';
import Theme from './Theme';

export function AppProvider(props) {
  return <Theme>{props.children}</Theme>;
}
