import { maxBy } from './maxBy';

describe('maxBy 함수는', () => {
  it('iteratee 함수의 return value 기준으로 max값을 찾는다.', () => {
    expect(maxBy([{ value: 1 }, { value: 3 }, { value: 9 }, { value: 6 }], ({ value }) => value)).toEqual({ value: 9 });
  });

  it('빈 Array를 넣었을 땐 undefined를 return한다.', () => {
    expect(maxBy([], ({ value }) => value)).toBeUndefined();
  });
});
