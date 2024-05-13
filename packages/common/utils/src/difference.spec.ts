import { difference, differenceWith } from './difference';

describe('difference', () => {
  it('returns the difference of two arrays.', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [2, 3, 4, 5, 6];
    const result = difference(a, b);
    expect(result).toEqual([1]);
  });
});

describe('differenceWith', () => {
  it('performs the difference operation as directed by `areItemsEqual`', function () {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];

    expect(differenceWith(objects, [{ x: 1, y: 2 }], (a, b) => a.x === b.x && a.y === b.y)).toStrictEqual([objects[1]]);
  });
});
