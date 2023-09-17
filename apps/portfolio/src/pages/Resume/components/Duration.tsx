import React from 'react';

export default function Duration(props) {
  const { from, to, className } = props;
  return (
    <span className={`${className}`}>
      <i className='far fa-calendar-alt mr-2 text-sm'></i>
      <span className='text-sm'>
        {from} - {to}
      </span>
    </span>
  );
}
