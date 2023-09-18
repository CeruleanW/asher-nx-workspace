/**
 * @description return if the array has at least one not-null-nor-empty-array element
 */
export function isFilledArray(obj: any) {
  return (
    Boolean(obj) &&
    Array.isArray(obj) &&
    obj.flat().length > 0 &&
    obj.flat()[0] !== null &&
    obj.flat()[0] !== undefined
  );
}

/**
 * combine two arrays by the prop of elments. No duplicates with the same value in the given prop should be in the result. The result should contain all elements of bot arrays. If the prop of object in the 1st array and the prop of object in the 2nd array have the same value, the corresponding object in the result should contain properties from both input arrays
 * @param prop the property name
 */
export function merge2ArraysOfObject(
  arr1: Array<any>,
  arr2: Array<any>,
  prop: string
): any[] {
  // no need to merge if one of the arrays has no elements
  if (!isFilledArray(arr1)) {
    return arr2;
  }

  if (!isFilledArray(arr2)) {
    return arr1;
  }

  const result = [...arr1, ...arr2].reduce((acc, obj) => {
    const key = obj[prop];
    if (!acc[key]) {
      acc[key] = obj;
    } else {
      acc[key] = Object.assign(acc[key], obj);
    }
    return acc;
  }, {});

  return Object.values(result);
}

/**
 *
 */
export function getAverage(arr: number[]): number {
  const sum = arr.reduce((a, b) => a + b, 0);
  const ave = sum / arr.length || 0;
  return ave;
}

/**
 *
 */
export function getAverageByProp(arr: any[], prop: string): number {
  if (!isFilledArray(arr)) {
    return null;
  }

  const sum = arr?.reduce((acc, item) => acc + item[prop], 0) || 0;
  const length = arr?.length;
  const ave = sum / length;
  return ave;
}

/**
 *
 */
export function truncateFalseValuesInArray(arr: any) {
  let firstZeroTailIndex = arr.length;
  for (let i = arr.length - 1; i >= 0; i--) {
    if (!arr[i]) {
      firstZeroTailIndex = i;
      i--;
    } else {
      break;
    }
  }
  return arr.slice(0, firstZeroTailIndex);
}

/**
 * @description filter the array of objects by the given property,
 * @param  {any[]} rows
 * @param  {string} propertyName
 * @param  {} propertyValue if the value is 'all', return all the objects
 */
export function filterByProperty(
  rows: any[],
  propertyName: string,
  propertyValue: any
): any[] {
  if (propertyValue.toUpperCase() === 'ALL') {
    return rows;
  }
  const filtered = rows.filter((row) => row[propertyName] === propertyValue);
  return filtered;
}


/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
export function filterArray(array: any[], filters) {
  if (!array) {
    return array;
  }

  const filterKeys = Object.keys(filters);
  return array.filter((item) => {
    // validates all filter criteria
    return filterKeys.every((key) => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
  /**
   * The method `filterArray()` has the following signature:
   *
   * `function filterArray<TInput = any>(array: TInput[], filters: IFilters) => TInput[]`
   *
   * Where the function receives an array as the first argument, and a plain object
   * describing the fields to filter as the last argument.
   * The function returns an array of the same type as the input array.
   *
   * The signature of the filters arguments is the following:
   *
   * `interface IFilters {
   *   [key: string]: (value: any) => boolean;
   * }`
   *
   * Where the `filters` argument is an object that contains a `key: string`
   * and its value is a function with the value of the property to evaluate.
   * As the function predicate is evaluated using the `Array.prototype.every()` method,
   * then it must return a boolean value, which will determine if the item
   * must be included or not in the filtered array.
   */
}
