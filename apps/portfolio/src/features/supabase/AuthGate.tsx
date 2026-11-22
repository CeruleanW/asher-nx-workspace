import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredSession, refreshSession, signIn, signOut, SupabaseSession } from './auth';
import { getSupabaseConfig, logSupabaseConfig } from './config';

interface SupabaseAuthState {
  session: SupabaseSession | null;
  initializing: boolean;
  setSession: (session: SupabaseSession | null) => void;
}

const AuthContext = createContext<SupabaseAuthState | null>(null);

/**
 * Session for the current visitor, or null when signed out or when no
 * SessionProvider is mounted above the consumer.
 */
export const useSupabaseSession = (): SupabaseSession | null =>
  useContext(AuthContext)?.session ?? null;

/**
 * Holds the Supabase session for the whole app and renders children
 * unconditionally. The sign-in requirement is enforced per route by
 * <AuthGate>, not here.
 */
export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = getStoredSession();
    if (!stored) {
      setInitializing(false);
      return;
    }
    refreshSession(stored)
      .then(setSession)
      .finally(() => setInitializing(false));
  }, []);

  useEffect(() => {
    if (!session) return;
    const refreshTimer = window.setInterval(() => {
      refreshSession(session).then(refreshed => {
        if (!refreshed) setSession(null);
        else if (refreshed.access_token !== session.access_token) setSession(refreshed);
      });
    }, 30_000);
    return () => window.clearInterval(refreshTimer);
  }, [session]);

  return <AuthContext.Provider value={{ session, initializing, setSession }}>{children}</AuthContext.Provider>;
}

/**
 * Blocks its children behind Supabase sign-in. Wrap only the routes that
 * need protection (currently the Resume page).
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  const session = auth?.session ?? null;
  const setSession = auth?.setSession ?? (() => {});
  const initializing = auth?.initializing ?? false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [configError, setConfigError] = useState('');

  useEffect(() => {
    if (session || initializing) return;
    try { getSupabaseConfig(); } catch (err) {
      logSupabaseConfig();
      setConfigError(err instanceof Error ? err.message : 'Supabase is not configured.');
    }
  }, [session, initializing]);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      setSession(await signIn(email, password));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (initializing) return <p role="status">Checking sign-in…</p>;
  if (session) {
    return <>
      <button type="button" onClick={() => { void signOut(session); setSession(null); }}>Sign out</button>
      {children}
    </>;
  }

  return <main style={{ maxWidth: 420, margin: '10vh auto', padding: 24 }}>
    <h1>Sign in to view this portfolio</h1>
    <p>Personal data is stored in a private Supabase bucket.</p>
    {(error || configError) && <p role="alert">{error || configError}</p>}
    {!configError && <form onSubmit={handleSignIn}>
      <label>Email <input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} /></label>
      <label>Password <input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} /></label>
      <button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button>
    </form>}
  </main>;
}
