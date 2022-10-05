import { last } from './last';

describe('last는', () => {
  it('배열의 마지막 요소를 반환한다.', () => {
    expect(last([1, 2, 3])).toEqual(3);
  });

  it('빈 배열의 경우 undefined를 반환한다.', () => {
    expect(last([])).toEqual(undefined);
  });
});
