import React from 'react';

export default function ContactInfo(props) {
  return (
    <div className='flex flex-wrap'>
      {props.children}
    </div>
  );
}
