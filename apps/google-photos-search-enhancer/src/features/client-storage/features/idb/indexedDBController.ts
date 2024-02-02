import { LocalMediaItem } from './../../../g-api/types';
import { dbName, OBJECT_STORE_NAME } from './constants';
import { IDBPObjectStore, openDB } from 'idb'; //https://www.npmjs.com/package/idb
import { getFuse } from '@root/shared/features/search';

let dbPromise = createDatabase();

// for general IDB usage
export async function getDatabase() {
  const db = await openDB(dbName);
  return db;
}

async function getObjectStore(name: string) {
  const db = await getDatabase();
  const store = db.transaction(name).objectStore(name);
  return store;
}

export async function getAllKeys(
  store: IDBPObjectStore
): Promise<IDBValidKey[]> {
  return await store.getAllKeys();
}

/**
 * for local media items
 * @returns
 */
export async function getLocalMediaItemsObjectStore() {
  return await getObjectStore(OBJECT_STORE_NAME);
}

export async function getAllKeysOfLocalMediaItems() {
  const store = await getLocalMediaItemsObjectStore();
  return await getAllKeys(store);
}

/**
 * Create a database with a 'localMediaItems' object store
 * @returns
 */
export function createDatabase() {
  const dbPromise = openDB(dbName, 1, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
    },
  });

  return dbPromise;
}

// store an array
export async function setMediaItems(mediaItems: LocalMediaItem[]) {
  const db = await dbPromise;
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  mediaItems.forEach((value) => {
    return new Promise((resolve, reject) => {
      resolve(tx.store.put(value));
    }).catch((error) => {
      console.log('Error: failed to store data in IndexedDB' + error);
    });
  });
}

/**
 * clear data in IndexedDB
 * @returns
 */
export async function clearData() {
  const db = await dbPromise;
  return db.clear(OBJECT_STORE_NAME);
}

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

/**
 * @description get corresponding key value in IndexedDB
 */
export async function getValue(key: string): Promise<any> {
  const db = await getDatabase();
  const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const store = tx.objectStore(OBJECT_STORE_NAME);
  const val = (await store.get(key)) || null;
  await tx.done;
  return val;
}
