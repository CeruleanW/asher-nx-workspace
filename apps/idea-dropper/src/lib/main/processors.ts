import { isFilledArray } from '@root/shared/utils';
import _ from 'lodash';
// import R from 'ramda';

export function processMainData(data) {
  if (!isFilledArray(data)) {
    return [];
  }
  return _.sortBy(data, ['name']);
}
