import React from 'react';

export default function Title(props) {
  return (
    <h2 className='section-title uppercase mb-2'>
      {props.text}
    </h2>
  );
}
