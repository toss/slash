import { flattenArray } from '.';

describe('flattenArray', () => {
  it('should work such that if a two-dimensional array is input, it returns a one-dimensional array', () => {
    const twoDimensionsArray1 = [
      [1, 2],
      [3, 4],
    ];
    expect(flattenArray(twoDimensionsArray1)).toEqual([1, 2, 3, 4]);

    const twoDimensionsArray2 = [
      [{ a: 1 }, { b: 2 }],
      [{ c: 3 }, { d: 4 }],
    ];
    expect(flattenArray(twoDimensionsArray2)).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }]);

    const twoDimensionsArray3 = [
      ['', false, 0, undefined, null],
      [null, undefined, 0, false, ''],
    ];
    expect(flattenArray(twoDimensionsArray3)).toEqual(['', false, 0, undefined, null, null, undefined, 0, false, '']);
  });

  it('should work by returning the array as is if a one-dimensional array is input', () => {
    const oneDimensionsArray = [1, 2, 3, 4];
    expect(flattenArray(oneDimensionsArray)).toEqual([1, 2, 3, 4]);
  });
});
