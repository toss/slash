import { uniq } from './uniq';

describe('uniq', () => {
  it('should return an array', () => {
    const inputList = [1, 2, 3, 4, 5];
    const uniqOutputList = uniq(inputList);

    expect(Array.isArray(uniqOutputList)).toBeTruthy();
  });

  it('should return an empty array if an empty array is passed as an argument', () => {
    expect(uniq([])).toEqual([]);
  });

  it('should remove duplicate values from a array', () => {
    const inputList = [1, 2, 1, 3, 2, 4, 1, 5, 1];
    const expectedList = [1, 2, 3, 4, 5];

    const uniqOutputList = uniq(inputList);

    expect(uniqOutputList).toEqual(expectedList);
    expect(uniqOutputList.length).toBe(expectedList.length);
  });

  it('should return an array with the same values as the original array if there are no duplicates', () => {
    const inputList = [1, 2, 3, 4, 5];
    const expectedList = [1, 2, 3, 4, 5];

    const uniqOutputList = uniq(inputList);

    expect(uniqOutputList).toEqual(expectedList);
    expect(uniqOutputList.length).toBe(expectedList.length);
  });
});
