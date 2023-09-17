import {createEntropy, MersenneTwister19937, sample} from 'random-js';

export function shuffle<T>(arr: Array<T>, n: number = 10): Array<T> {
  const randomKeys = [];
  for (let i = 0; i < n; i++) {
    const index = getRandomInt(0, arr?.length);
    randomKeys.push(arr[index]);
  }
  return randomKeys;
}

/**
 * The maximum is exclusive and the minimum is inclusive
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

/**
 *
 */
export function createSeed() {
  const entropy = createEntropy();
  return entropy;
}

/**
 *
 */
export function getRandomArrayFromSeed(population: any[], seed: number[]) {
  const mt = MersenneTwister19937.seedWithArray(seed);
  const random = sample(mt, population, population.length);
  return random;
}
