import React from 'react'

export function UserProfile({ user }) {
  const {name, email, image} = user || {};
  const displayedName = name ?? email;

  return (
    <div>
      <p style={{ marginBottom: '10px' }}> Welcome, {displayedName}</p> <br />
      <img src={image} alt={`${displayedName}`} />
    </div>
  )
}
