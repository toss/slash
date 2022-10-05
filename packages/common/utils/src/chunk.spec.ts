import { chunk } from './chunk';

describe('chunk는', () => {
  it('빈배열 입력시 빈배열 리턴한다', () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it('size가 1 미만인 경우 빈배열을 리턴한다.', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
  });

  it('전체 길이가 size의 배수인 경우 모든 엘리먼트가 사이즈만큼 고르게 나눠진다', () => {
    expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  it('전체 길이가 size의 배수가 아닐 때 마지막 청크는 남은 엘리먼트들이다.', () => {
    expect(chunk([1, 2, 3, 4], 6)).toEqual([[1, 2, 3, 4]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });
});
