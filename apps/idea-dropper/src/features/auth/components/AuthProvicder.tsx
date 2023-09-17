// import { Provider } from 'next-auth/client';
import { SessionProvider } from "next-auth/react";

export function AuthProvicder({  children, ...optionals }) {
  const {session, ...rest} = optionals;
  return (
    <SessionProvider session={session} >{children}</SessionProvider>
  )
}
