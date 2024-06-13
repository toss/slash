import { isDifferentArray } from '.';

describe('isDifferentArray', () => {
  it('should return true if the two values are different in length.', () => {
    const value1 = [1];
    const value2 = [2, 3];

    const result = isDifferentArray(value1, value2);
    expect(result).toBe(true);
  });

  it('should return true if the two arrays have the same length but one primitive value is different.', () => {
    const value1 = [1, 3];
    const value2 = [1, 2];

    const result = isDifferentArray(value1, value2);
    expect(result).toBe(true);
  });

  it('should return true if two arrays have the same length but contain different objects', () => {
    const value1 = [{ test: 1 }, { test: 2 }];
    const value2 = [{ test: 1 }, { test: 3 }];

    const result = isDifferentArray(value1, value2);
    expect(result).toBe(true);
  });

  it('should return false when two arrays are identical', () => {
    const value1 = [1, 2];
    const value2 = [1, 2];

    const result = isDifferentArray(value1, value2);
    expect(result).toBe(false);
  });

  it('should return false when two arrays are empty', () => {
    const result = isDifferentArray([], []);
    expect(result).toBe(false);
  });

  it('should handle special cases like NaN and zeros correctly', () => {
    const array1 = [NaN, -0];
    const array2 = [NaN, +0];

    const result = isDifferentArray(array1, array2);
    expect(result).toBe(true);
  });
});
