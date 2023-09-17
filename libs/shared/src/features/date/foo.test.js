import {compareIsLaterThanOrEqual, compareIsEarlierThanOrEqual, diffInHours} from './foo';


test('When b is later than a, should return false', () => {
  const a = new Date();
  let b;
  setTimeout(() => {
    b = new Date();
    expect(compareIsLaterThanOrEqual(a, b)).toBe(false);
  });

});

test('When a is later than b, should return true', () => {
  const b = new Date();
  let a;
  setTimeout(() => {
    a = new Date();
    expect(compareIsLaterThanOrEqual(a, b)).toBe(true);
  });

});

describe("Test compareIsEarlierThanOrEqual", () => {
  it("When b is later than a, should return true", () => {
    const a = new Date();
    let b;
    setTimeout(() => {
      b = new Date();
      expect(compareIsEarlierThanOrEqual(a, b)).toBe(true);
    });
  });

  it("When a is later than b, should return false", () => {
    const b = new Date();
    let a;
    setTimeout(() => {
      a = new Date();
      expect(compareIsEarlierThanOrEqual(a, b)).toBe(false);
    });
  });
});

describe("Test differenceInHours", () => {
  it("19:20:00 and 19:00:00 should return 0", () => {
    const date1 = new Date(2014, 6, 2, 19, 20);
    const date2 = new Date(2014, 6, 2, 19, 0);
    expect(diffInHours(date1, date2)).toBe(0);
  });

  it("12:59:00 and 14:02:00 should return -1", () => {
    const date1 = new Date(2014, 6, 2, 12, 59);
    const date2 = new Date(2014, 6, 2, 14, 2);
    expect(diffInHours(date1, date2)).toBe(-1);
  });

  it("18:01:00 and 14:59:00 should return 3", () => {
    const date1 = new Date(2014, 6, 2, 18, 1);
    const date2 = new Date(2014, 6, 2, 14, 59);
    expect(diffInHours(date1, date2)).toBe(3);
  });
});