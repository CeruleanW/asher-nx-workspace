import { getDatabase, OBJECT_STORE_NAME } from "../../features/client-storage/features/idb";
import { getFuse } from '@root/shared/features/search';

export async function searchForItems(keyword) {
  console.log('Keyword:' + keyword);
  const t0 = performance.now();

  // request data from IndexedDB
  const db = await getDatabase();
  const request = await db.getAll(OBJECT_STORE_NAME); // an array of all data objects

  // execute the search
  const options = {
    includeScore: true,
    keys: ['filename', 'description'],
  };
  const fuse = getFuse(request, options);
  const result = fuse.search(keyword);

  const t1 = performance.now();
  console.log(`search function took ${t1 - t0} milliseconds.`);

  return result;
}
