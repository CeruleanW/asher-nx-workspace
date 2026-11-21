import { getSupabaseConfig } from './config';

const SESSION_KEY = 'portfolio.supabase.session';

export interface SupabaseSession {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
}

export function getStoredSession(): SupabaseSession | null {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return session?.access_token && session?.refresh_token ? session : null;
  } catch {
    return null;
  }
}

function saveSession(session: SupabaseSession | null) {
  if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else localStorage.removeItem(SESSION_KEY);
}

async function requestSession(path: string, body: Record<string, string>) {
  const { url, anonKey } = getSupabaseConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=${path}`, {
    method: 'POST',
    headers: { apikey: anonKey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.msg || payload.message || payload.error_description || 'Authentication failed.');
  return { ...payload, expires_at: Math.floor(Date.now() / 1000) + payload.expires_in } as SupabaseSession;
}

export async function signIn(email: string, password: string) {
  const session = await requestSession('password', { email, password });
  saveSession(session);
  return session;
}

export async function refreshSession(session: SupabaseSession) {
  if (!session.expires_at || session.expires_at > Date.now() / 1000 + 60) return session;
  try {
    const refreshed = await requestSession('refresh_token', { refresh_token: session.refresh_token });
    saveSession(refreshed);
    return refreshed;
  } catch {
    saveSession(null);
    return null;
  }
}

export async function signOut(session?: SupabaseSession | null) {
  if (session?.access_token) {
    try {
      const { url, anonKey } = getSupabaseConfig();
      await fetch(`${url}/auth/v1/logout`, {
        method: 'POST',
        headers: { apikey: anonKey, Authorization: `Bearer ${session.access_token}` },
      });
    } catch {
      // Clear the local session even if the remote revocation request fails.
    }
  }
  saveSession(null);
}
