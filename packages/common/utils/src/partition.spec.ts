import { identity } from './identity';
import { partition } from './partition';

describe('partition은', () => {
  it('predicate의 결과에 따라 잘 item을 분류한다', () => {
    expect(partition([], identity)).toStrictEqual([[], []]);
    expect(partition([1, 2, 3], () => true)).toStrictEqual([[1, 2, 3], []]);
    expect(partition([1, 2, 3], () => false)).toStrictEqual([[], [1, 2, 3]]);
    expect(partition([1, 2, 3], x => x >= 3)).toStrictEqual([[3], [1, 2]]);
    expect(partition([1, 2, 3, 4, 5], x => x < 3)).toStrictEqual([
      [1, 2],
      [3, 4, 5],
    ]);
  });
});
