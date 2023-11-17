import { uniqWith } from './uniqWith';

describe('uniqWith', () => {
  it('should remove duplicates from an array based on comparator', () => {
    const arr = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
    ];

    expect(uniqWith(arr, (x, y) => x.x === y.x && x.y === y.y)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('should return same array when no duplicates in array', () => {
    expect(uniqWith([1, 2, 3, 4, 5], (x, y) => x === y)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return correctly when all values duplicates in array', () => {
    expect(uniqWith([1, 1, 1, 1, 1], (x, y) => x === y)).toEqual([1]);
  });

  it('should return an empty array when given an empty array', () => {
    expect(uniqWith([], (x, y) => x === y)).toEqual([]);
  });
});
