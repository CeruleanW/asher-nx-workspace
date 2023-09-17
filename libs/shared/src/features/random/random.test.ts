import {getRandomArrayFromSeed, createSeed} from './foo';

describe('Random functions', () => {
  it('getRandomArrayFromSeed should return shuffled arrays', () => {
    const population = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15];
    const length = population.length;
    const seed = createSeed();
    const random1 = getRandomArrayFromSeed(population, seed);
    expect(random1).toHaveLength(length);
    expect(random1).not.toEqual(population);
    expect(random1).toEqual(expect.arrayContaining(population));
    const random2 = getRandomArrayFromSeed(population, seed);
    expect(random2).toHaveLength(length);
    expect(random2).not.toEqual(population);
    expect(random2).toEqual(expect.arrayContaining(population));
  });
})
