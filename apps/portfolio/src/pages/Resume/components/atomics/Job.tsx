import React from 'react';

export default function Job(props) {
  const {children} = props;
  return (
    <div className='inner-section'>
      {children}
    </div>
  );
}
