import { arrayIncludes } from '.';

describe('arrayIncludes', () => {
  it('should work identical to Array.prototype.includes', () => {
    const arr: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];

    const includedElement = 'a' as string;
    expect(arrayIncludes(arr, includedElement)).toBe(true);

    const excludedElement = 'd' as string;
    expect(arrayIncludes(arr, excludedElement)).toBe(false);
  });

  it('should work well with fromIndex', () => {
    const arr: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];

    const element = 'a';
    expect(arrayIncludes(arr, element, 0)).toBe(true);
    expect(arrayIncludes(arr, element, 1)).toBe(false);
  });
});
