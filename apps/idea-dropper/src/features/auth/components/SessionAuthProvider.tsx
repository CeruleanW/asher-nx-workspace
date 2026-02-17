// import { Provider } from 'next-auth/client';
import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children, ...optionals }) {
  const { session, ...rest } = optionals;
  return (
    <SessionProvider session={session} >{children}</SessionProvider>
  )
}
