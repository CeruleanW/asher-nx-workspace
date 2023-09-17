import { getAllKeysOfLocalMediaItems } from '../client-storage';

/**
 *
 * @returns randomized keys
 */
export async function getRandomKeys(n: number = 10): Promise<IDBValidKey[]> {
  const keys = await getAllKeysOfLocalMediaItems();
  return shuffleKeys(keys, n);
}

export function shuffleKeys(keys, n: number = 10) {
  const randomKeys = [];
  for (let i = 0; i < n; i++) {
    const index = getRandomInt(0, keys?.length);
    randomKeys.push(keys[index]);
  }
  return randomKeys;
}

//The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
