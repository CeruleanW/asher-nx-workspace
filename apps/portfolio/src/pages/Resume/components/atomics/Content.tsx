import React from 'react';

export default function Content(props) {
  return (
    <p className='text-lg'>
      {props.children}
    </p>
  );
}
