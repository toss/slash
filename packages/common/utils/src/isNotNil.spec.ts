import { isNotNil } from '.';

describe('isNotNil은', () => {
  it('null이나 undefined가 아닌 값을 넘기면 true 이다.', () => {
    for (const val of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNotNil(val)).toBe(true);
    }
  });

  it('null이나 undefined을 넘기면 false 이다.', () => {
    for (const val of [null, undefined]) {
      expect(isNotNil(val)).toBe(false);
    }
  });
});
