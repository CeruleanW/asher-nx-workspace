import {getAllKeysOfLocalMediaItems} from './indexedDBController';
import useSWR from 'swr';

export const INDEXEDDB_LOCALMEDIAITEMS_KEY = 'AllKeysOfLocalMediaItems';

export function useIndexedDB() {
  return useSWR(INDEXEDDB_LOCALMEDIAITEMS_KEY, getAllKeysOfLocalMediaItems)
}
