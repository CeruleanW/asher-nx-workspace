import React from 'react'
import { useSession } from '../hooks';
import { AccessDenied } from './AccessDenied';

/**
 * Wrap a Protected page
 */
export function Protected({ children }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // When rendering client side don't display anything until loading is complete
  if (loading) return null; // Or <Loader />

  // If no session exists, display access denied message
  if (!session) { return <><AccessDenied /></> }

  // If session exists, display content
  return (
    <>
      {children}
    </>
  )
}
