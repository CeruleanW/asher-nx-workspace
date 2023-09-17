import React from 'react';

ContactItem.defaultProps = {
  type: 'link',
};

export default function ContactItem({ type, text, ...optionals }) {
  const icon = getIcon(type);
  const isLink = ['link', 'github', 'portfolio', 'linkedin'].includes(type);
  const shouldObfuscate = ['phone', 'email', 'address'].includes(type);
  
  return (
    <div className={'flex-1-3'}>
      {icon}
      {isLink ? (
        <a href={text}>
          <span className={'pl-2 list-item-typo'}>{text}</span>
        </a>
      ) : (
        <span className={'pl-2 list-item-typo'}>{text}</span>
      )}
    </div>
  );
}

function getIcon(type) {
  switch (type) {
    case 'phone':
      return <i className='fas fa-phone list-item-icon'></i>;
    case 'email':
      return <i className='fas fa-envelope list-item-icon'></i>;
    case 'link':
      return <i className='fas fa-link list-item-icon'></i>;
    case 'address':
      return <i className='fas fa-map-marker-alt list-item-icon'></i>;
    case 'github':
      return <i className='fab fa-github list-item-icon'></i>;
    case 'linkedin':
      return <i className='fab fa-linkedin-in list-item-icon'></i>;
    case 'portfolio':
      return <i className="fas fa-home list-item-icon"></i>
    default:
      return <span>No Icon</span>;
  }
}
