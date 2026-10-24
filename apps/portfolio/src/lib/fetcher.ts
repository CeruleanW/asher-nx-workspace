import axios from 'axios';
import yaml from 'js-yaml';
import { PERSONAL_DATA_LINK, PROJECTS_DATA_LINK } from './apis';
import { getSupabaseConfig } from '../features/supabase/config';
import type { SupabaseSession } from '../features/supabase/auth';

export async function fetchPersonalData(session: SupabaseSession): Promise<any> {
  const { url, anonKey, bucket } = getSupabaseConfig();
  const response = await fetch(
    `${url}/storage/v1/object/authenticated/${encodeURIComponent(bucket)}/${PERSONAL_DATA_LINK}`,
    { headers: { apikey: anonKey, Authorization: `Bearer ${session.access_token}` } }
  );
  if (!response.ok) {
    throw new Error(response.status === 403 || response.status === 404
      ? 'Personal data is not available to this account.'
      : `Could not load personal data (${response.status}).`);
  }
  return yaml.load(await response.text());
}

export async function fetchProjectsData() {
  const res = await axios.get(PROJECTS_DATA_LINK);
  return res?.data;
}
