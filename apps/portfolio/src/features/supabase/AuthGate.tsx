import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredSession, refreshSession, signIn, signOut, SupabaseSession } from './auth';
import { getSupabaseConfig } from './config';

const SessionContext = createContext<SupabaseSession | null>(null);
export const useSupabaseSession = () => useContext(SessionContext);

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    try {
      const stored = getStoredSession();
      if (!stored) {
        try { getSupabaseConfig(); } catch (err) {
          setError(err instanceof Error ? err.message : 'Supabase configuration is invalid.');
        }
        setLoading(false);
        return;
      }
      refreshSession(stored).then(setSession).finally(() => setLoading(false));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Supabase configuration is invalid.');
      setLoading(false);
    }
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

  if (loading) return <p role="status">Checking sign-in…</p>;
  if (session) {
    return <SessionContext.Provider value={session}>
      <button type="button" onClick={() => { void signOut(session); setSession(null); }}>Sign out</button>
      {children}
    </SessionContext.Provider>;
  }

  let configError = '';
  try { getSupabaseConfig(); } catch (err) { configError = err instanceof Error ? err.message : 'Supabase is not configured.'; }
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
