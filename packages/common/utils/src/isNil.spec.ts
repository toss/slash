import { isNil } from '.';

describe('isNil', () => {
  it('should return false when a value other than null or undefined is passed', () => {
    for (const val of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNil(val)).toBe(false);
    }
  });

  it('should return true when null or undefined is passed', () => {
    for (const val of [null, undefined]) {
      expect(isNil(val)).toBe(true);
    }
  });
});
