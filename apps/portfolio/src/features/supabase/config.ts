export function getSupabaseConfig() {
  const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_BUCKET } = process.env;
  const missing = [
    !REACT_APP_SUPABASE_URL && 'REACT_APP_SUPABASE_URL',
    !REACT_APP_SUPABASE_ANON_KEY && 'REACT_APP_SUPABASE_ANON_KEY',
  ].filter(Boolean).join(' and ');
  if (missing) {
    throw new Error(`Supabase is not configured: ${missing} not set. Create apps/portfolio/.env (see .env.example) and restart the dev server.`);
  }
  return {
    url: REACT_APP_SUPABASE_URL.replace(/\/$/, ''),
    anonKey: REACT_APP_SUPABASE_ANON_KEY,
    bucket: REACT_APP_SUPABASE_BUCKET || 'personal-data',
  };
}

/**
 * Development diagnostic: reports which Supabase environment variables the
 * running bundle can actually see, without printing secret values. Call it
 * when a configuration check fails to tell "env not loaded" apart from
 * "stale bundle".
 */
export function logSupabaseConfig(): void {
  if (process.env.NODE_ENV !== 'development') return;
  const check = (name: string) => {
    const value = process.env[name];
    return value ? `${name}=set (${value.length} chars)` : `${name}=NOT SET`;
  };
  // eslint-disable-next-line no-console
  console.info(
    `[supabase] env check: ${check('REACT_APP_SUPABASE_URL')} (${process.env.REACT_APP_SUPABASE_URL || 'n/a'}), ${check('REACT_APP_SUPABASE_ANON_KEY')}, ${check('REACT_APP_SUPABASE_BUCKET')}`
  );
}
