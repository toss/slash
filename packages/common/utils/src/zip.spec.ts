import { zip } from './zip';

describe('zip 함수는', () => {
  it('같은 길이의 배열에 대해 정상적으로 zip 연산을 수행한다.', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('다른 길이의 배열에 대해서는 undefined로 채워준다.', () => {
    expect(zip([1, 2], ['a', 'b', 'c'])).toEqual([
      [1, 'a'],
      [2, 'b'],
      [undefined, 'c'],
    ]);

    expect(zip([1, 2, 3], ['a'])).toEqual([
      [1, 'a'],
      [2, undefined],
      [3, undefined],
    ]);
  });

  it('3개 이상의 배열을 zip 할 수 있다.', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'], ['foo', 'bar', 'baz'])).toEqual([
      [1, 'a', 'foo'],
      [2, 'b', 'bar'],
      [3, 'c', 'baz'],
    ]);
  });
});
