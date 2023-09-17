import React from 'react';

export function Typography(props) {
  return <p {...props} />;
}

export function Subtitle2(props) {
  return <p className={'text-sm text-gray-500'} {...props} />;
}
