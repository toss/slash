import { isNonEmptyArray } from '.';

describe('isNonEmptyArray', () => {
  it('should return true when array length is equal or bigger than 1', () => {
    expect(isNonEmptyArray([1])).toBe(true);
    expect(isNonEmptyArray([1, 2])).toBe(true);
  });
  it('should return false when array is empty', () => {
    expect(isNonEmptyArray([])).toBe(false);
  });
});
