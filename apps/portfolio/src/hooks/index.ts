import { fetchProjectsData, PROJECTS_DATA_LINK, PERSONAL_DATA_LINK, fetchPersonalData } from '../lib';
import useSWR from 'swr';
import { useSupabaseSession } from '../features/supabase/AuthGate';
import type { SupabaseSession } from '../features/supabase/auth';

interface Project {
  id: string;
  [key: string]: unknown;
}

interface ProjectsData {
  projects?: Project[];
}

interface UseProjectsDataResult {
  projectData: ProjectsData | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any; // pragmatic: consumers use error?.messsage (pre-existing typo) without type guards
  isLoading: boolean;
}

export function useProjectsData(): UseProjectsDataResult {
  const { data, error } = useSWR<ProjectsData>(PROJECTS_DATA_LINK, fetchProjectsData);
  return { projectData: data, error, isLoading: !data && !error };
}

interface UseProjectDataByIDResult {
  projectData: Project | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any; // pragmatic: consumers use error?.messsage without type guards
  isLoading: boolean;
}

export function useProjectDataByID(id: string): UseProjectDataByIDResult {
  const { projectData, error, isLoading } = useProjectsData();
  let project: Project | undefined;
  if (projectData) {
    project = projectData?.projects?.find((p) => p.id === id);
  }

  return { projectData: project, error, isLoading };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePersonalData(): { data: any; error: any; isLoading: boolean } {
  // pragmatic: data is any to allow destructuring in Resume/index.tsx without refactoring consumers
  const session = useSupabaseSession();
  const { data, error } = useSWR(
    session ? [PERSONAL_DATA_LINK, session.access_token] : null,
    () => fetchPersonalData(session as SupabaseSession)
  );
  // Without a session nothing is fetched (SWR key is null): that is a plain
  // "no data" state for public pages like Contact, not a loading state.
  return { data, error, isLoading: !!session && !data && !error };
}
