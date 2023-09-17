import {
  format,
  formatRFC3339,
  fromUnixTime,
  compareAsc,
  parseISO,
  parse,
  isSameHour,
  getUnixTime,
  differenceInCalendarDays,
  isToday as isTodayNative,
  isYesterday as isYesterdayNative,
  isSameDay as isSameDayNative,
  subDays,
  addDays,
  differenceInHours,
  getTime,
  subMilliseconds,
  startOfDay,
  subWeeks,
} from 'date-fns';
import { DateSelected } from './types';

export function getUnixTimeByDate(date: Date = new Date()): number {
  return getUnixTime(date);
}

/**
 *
 * @returns e.g. '2019-09-18T19:00:52Z'
 */
export function getDateRFC(date: Date = new Date()): string {
  return formatRFC3339(date);
}

export function getTimeInMilliseconds(date: Date = new Date()): number {
  return getTime(date);
}

/**
 *
 * @param time
 * @returns a number in hour, e.g. "12:30" -> 12.5
 */
export function timeStringToFloat(time: string) {
  // console.debug('timeStringToFloat input:', time);
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  const result = hours + minutes / 60;
  // console.debug('timeStringToFloat output:', result);
  return result;
}

export function getNow(): Date {
  return new Date();
}

export function getYesterday(): Date {
  return subDays(getNow(), 1);
}

export function parseString(input: string) {
  return parseISO(input);
}

export function parseEpochNumber(input: number) {
  // return parse(input);
}

export function formatCalendarDateString(data, dateSelected): string {
  if (!data || !dateSelected) {
    return null;
  }

  return formatDateHeader(
    new Date(data[0].date),
    new Date(data[data.length - 1].date),
    dateSelected
  );
}

function formatDateHeader(
  startDate: Date,
  endDate: Date,
  dateSelected: DateSelected
) {
  if (isSingleDay(dateSelected))
    return format(new Date(startDate), 'LLL do 	yyyy');
  if (dateSelected === DateSelected.week)
    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
  if (dateSelected === DateSelected.month)
    return `${startDate.toDateString()} - ${endDate.toDateString()}`;
}

export const isSingleDay = (dateSelected: DateSelected) => {
  if (
    dateSelected === DateSelected.today ||
    dateSelected === DateSelected.yesterday ||
    dateSelected === DateSelected.custom
  )
    return true;
  else return false;
};

// number is in miliseconds
export function isToday(date: number | Date): boolean {
  return isTodayNative(date);
}

export function isYesterday(date: number): boolean {
  return isYesterdayNative(date);
}

export function isSameDay(date1: number, date2: number): boolean {
  return isSameDayNative(
    createDateByUnixTime(date1),
    createDateByUnixTime(date2)
  );
}

export function createDateByUnixTime(unixTime: number): Date {
  const result = fromUnixTime(unixTime);
  // console.debug('createDateByUnixTime output:', result);
  return result;
}

/**
 *
 * @param a Date or miliseconds
 * @param b Date or miliseconds
 * @returns {boolean} is a before or equals b. If any of the two is null, return null.
 */
export function compareIsEarlierThanOrEqual(a: Date | number, b: Date | number): boolean {
  // console.log('a: ', a);
  // console.log('b: ', b);
  return compareAsc(a, b) <= 0;
}

/**
 *
 * @param a Date or miliseconds
 * @param b Date or miliseconds
 * @returns {boolean} is a before b. If any of the two is null, return null.
 */
 export function compareIsEarlier(a: Date | number, b: Date | number): boolean {
  // console.log('a: ', a);
  // console.log('b: ', b);
  return compareAsc(a, b) < 0;
}

/**
 *
 * @param a
 * @param b
 * @returns {boolean} is a after or equals b. If any of the two is null, return null.
 */
export function compareIsLaterThanOrEqual(a: Date | number, b: Date | number): boolean {
  return compareAsc(a, b) >= 0;
}

export function checkIfDiffInHour(dateNum1, dateNum2): boolean {
  const date1 = new Date(dateNum1);
  const date2 = new Date(dateNum2);
  return !isSameHour(date1, date2);
}

export function diffInHours(date1: Date | number, date2: Date | number): number {
  return differenceInHours(date1, date2);
}

export function diffInCalendarDays(date1, date2) {
  return differenceInCalendarDays(date1, date2);
}

export function addDaysToUnixTime(d: number, num: number) {
  const date = createDateByUnixTime(d);
  const result = addDays(date, num);
  return result;
}

export function subDaysToUnixTime(d: number, num: number) {
  const date = createDateByUnixTime(d);
  const result = subDays(date, num);
  return result;
}

export function subMs(date: Date|number, amount: number) {
  return subMilliseconds(date, amount);
}

/**
 * @description - Returns query params for api's depending on if they need a start or endDate
 * @param date 
 * @param selection 
 * @returns 
 */
export function parseSelectionDate(
  date: Date,
  selection: DateSelected
): { startDate?: string; endDate: string } {
  if (
    selection === 'today' ||
    selection === 'custom' ||
    selection === 'yesterday'
  )
    return { endDate: formatRFC3339(startOfDay(date)) };
  if (selection === 'week' || selection === 'month')
    return {
      startDate: formatRFC3339(subWeeks(date, 1)),
      endDate: formatRFC3339(date),
    };
}