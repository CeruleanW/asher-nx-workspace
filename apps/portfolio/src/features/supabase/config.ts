export function getSupabaseConfig() {
  const { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_BUCKET } = process.env;
  if (!REACT_APP_SUPABASE_URL || !REACT_APP_SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not configured. Set the portfolio Supabase environment variables.');
  }
  return {
    url: REACT_APP_SUPABASE_URL.replace(/\/$/, ''),
    anonKey: REACT_APP_SUPABASE_ANON_KEY,
    bucket: REACT_APP_SUPABASE_BUCKET || 'personal-data',
  };
}
