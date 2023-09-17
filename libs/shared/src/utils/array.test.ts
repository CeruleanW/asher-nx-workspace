import { merge2ArraysOfObject, isFilledArray } from './array';

describe('merge2ArraysOfObject', () => {
  const arr1 = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];
  const arr2 = [
    { id: 1, age: 25 },
    { id: 3, age: 30 },
  ];

  it('should merge two arrays of objects by the given prop', () => {
    expect(merge2ArraysOfObject(arr1, arr2, 'id')).toEqual([
      { id: 1, name: 'John', age: 25 },
      { id: 2, name: 'Jane' },
      { id: 3, age: 30 },
    ]);
  });

  it('should handle empty arrays', () => {
    expect(merge2ArraysOfObject([], [], 'id')).toEqual([]);
    expect(merge2ArraysOfObject([], arr2, 'id')).toEqual(arr2);
    expect(merge2ArraysOfObject(arr1, [], 'id')).toEqual(arr1);
  });

  it('should handle objects with the same prop value but different properties', () => {
    const arr3 = [
      { id: 1, name: 'John' },
      { id: 1, age: 25 },
    ];
    expect(merge2ArraysOfObject(arr3, arr2, 'id')).toEqual([
      { id: 1, name: 'John', age: 25 },
      { id: 3, age: 30 },
    ]);
  });

  it('should handle objects with the same prop value and same properties', () => {
    const arr4 = [
      { id: 1, name: 'John' },
      { id: 1, name: 'Doe' },
    ];
    expect(merge2ArraysOfObject(arr4, arr2, 'id')).toEqual([
      { id: 1, name: 'Doe', age: 25 },
      { id: 3, age: 30 },
    ]);
  });

  const wifiList1 = [
    { rssi: -36, ssid: 'DEEPWIFI' },
    { rssi: -40, ssid: 'BELL693' },
    { rssi: -45, ssid: 'VNDenture' },
    { rssi: -46, ssid: 'TELUSWiFi7977' },
    { rssi: -48, ssid: 'DEEPWIFI2' },
    { rssi: -49, ssid: 'PPN-RCP-WIFI' },
    { rssi: -49, ssid: 'PARL-WIFI' },
    { rssi: -49, ssid: 'P-CORP-101' },
    { rssi: -50, ssid: 'CCN-WiFi' },
  ];

  const wifiList2 = [{ password: 'testpw', ssid: 'testssid' }];

  const result1 = [
    { rssi: -36, ssid: 'DEEPWIFI' },
    { rssi: -40, ssid: 'BELL693' },
    { rssi: -45, ssid: 'VNDenture' },
    { rssi: -46, ssid: 'TELUSWiFi7977' },
    { rssi: -48, ssid: 'DEEPWIFI2' },
    { rssi: -49, ssid: 'PPN-RCP-WIFI' },
    { rssi: -49, ssid: 'PARL-WIFI' },
    { rssi: -49, ssid: 'P-CORP-101' },
    { rssi: -50, ssid: 'CCN-WiFi' },
    { password: 'testpw', ssid: 'testssid' },
  ];

  test('should contain all elements of both arrays', () => {
    expect(merge2ArraysOfObject(wifiList1, wifiList2, 'ssid')).toEqual(
      expect.arrayContaining(result1)
    );
  });
});


describe('isFilledArray', () => {
  it('returns false for empty arrays', () => {
    expect(isFilledArray([])).toBe(false);
  });

  it('returns false for arrays containing only null or undefined values', () => {
    expect(isFilledArray([null, undefined])).toBe(false);
  });

  it('returns false for arrays containing only empty arrays', () => {
    expect(isFilledArray([[], []])).toBe(false);
  });

  it('returns true for arrays containing non-empty arrays', () => {
    expect(isFilledArray([[1, 2], [], [3]])).toBe(true);
  });

  it('returns true for arrays containing non-null and non-empty values', () => {
    expect(isFilledArray([1, 'foo', [2, 3]])).toBe(true);
  });

  it('returns false for non-array values', () => {
    expect(isFilledArray(null)).toBe(false);
    expect(isFilledArray(undefined)).toBe(false);
    expect(isFilledArray(0)).toBe(false);
    expect(isFilledArray('foo')).toBe(false);
    expect(isFilledArray({})).toBe(false);
  });
});






