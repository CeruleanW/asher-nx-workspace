import React from 'react';

export default function Location(props) {
  const {className} = props;
  return (
    <span className={`${className} text-sm`}>
      <i className='fas fa-map-marker-alt mr-2 text-sm'></i>
      {props.children}
    </span>
  );
}
