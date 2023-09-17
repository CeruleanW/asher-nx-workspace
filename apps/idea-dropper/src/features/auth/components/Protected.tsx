import React from 'react'
import { useSession } from '../hooks';
import { AccessDenied } from './AccessDenied';

/**
 * Wrap a Protected page
 */
export function Protected({children}) {
  const { data: session } = useSession();

  // When rendering client side don't display anything until loading is complete
  // if (typeof window !== 'undefined' && loading) return null;

  // If no session exists, display access denied message
  if (!session) { return <><AccessDenied /></> }

  // If session exists, display content
  return (
    <>
      {children}
    </>
  )
}
