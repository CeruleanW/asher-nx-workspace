import React from 'react';

export default function ProjectLink(props) {
  const { link } = props;
  return (
    <a href={link} className='light-text'>
      <i className='fas fa-link mr-2 light-text'></i>
      {link}
    </a>
  );
}
