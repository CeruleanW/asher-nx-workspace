import {createDateByUnixTime} from './foo';
import {
  format as nativeFormat,
  formatRFC3339,
  fromUnixTime,
  formatDistance,
} from 'date-fns';

export function formatFromUnixTime(unix: number, form: string) {
  return nativeFormat(createDateByUnixTime(unix), form);
}

/**
 * https://date-fns.org/v2.29.3/docs/format
 */
export function format(date: number | Date, form: string) {
  return nativeFormat(date, form);
}

// * Converts seconds into a string like "1 min, 2 hours, 1 day"
export const secondsToTime = (s: number) => {
  return formatDistance(0, s * 1000, { includeSeconds: true });
};


export const secondsToMinutes = (s: number) => {
  // * Check if number is infinty
  if (!isFinite(s)) return "No Contacts Found";
  return formatDistance(0, s * 1000, { includeSeconds: true });
};
