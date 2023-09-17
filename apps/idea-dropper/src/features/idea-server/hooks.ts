import useSWR from 'swr';
import { getData } from '@root/shared/features/axios';
import { ALL_BOX, USER_BY_EMAIL } from './apis';
import { BoxResponseDTO } from './types';

/**
 * hook for get all boxes
 */
export function useAllBoxes(enabled = true) {
  const result = useSWR<BoxResponseDTO[]>(enabled ? ALL_BOX : null, getData);
  return result;
}

/**
 *
 */
export function useUserByEmail(userEmail: string) {
  const url = `${USER_BY_EMAIL}/${encodeURIComponent(userEmail)}`;
  const result = useSWR<any>(url ? url : null, getData);
  // console.log("file: hooks.ts:20 ~ useUserByEmail ~ result:", result)
  return result;
}
