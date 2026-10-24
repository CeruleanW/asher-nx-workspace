import { fetchProjectsData, PROJECTS_DATA_LINK, PERSONAL_DATA_LINK, fetchPersonalData } from '../lib';
import useSWR from 'swr';
import { useSupabaseSession } from '../features/supabase/AuthGate';

export function useProjectsData() {
  const { data, error } = useSWR(PROJECTS_DATA_LINK, fetchProjectsData);
  return { projectData: data, error, isLoading: !data && !error };
}

export function useProjectDataByID(id) {
  const { projectData, error, isLoading } = useProjectsData();
  let project;
  if (projectData) {
    project = projectData?.projects?.find((project) => project.id === id);
  }

  return { projectData: project, error, isLoading };
}

/**
 *
 * @returns
 */
export function usePersonalData() {
  const session = useSupabaseSession();
  const { data, error } = useSWR(session ? [PERSONAL_DATA_LINK, session.access_token] : null,
    () => fetchPersonalData(session));
  return { data, error, isLoading: !data && !error };
}
