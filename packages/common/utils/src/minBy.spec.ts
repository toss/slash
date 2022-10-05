import { minBy } from './minBy';

describe('minBy 함수는', () => {
  it('iteratee 함수의 return value 기준으로 min값을 찾는다.', () => {
    expect(minBy([{ value: 1 }, { value: 3 }, { value: 9 }, { value: 6 }], ({ value }) => value)).toEqual({ value: 1 });
  });

  it('빈 Array를 넣었을 땐 undefined를 return한다.', () => {
    expect(minBy([], ({ value }) => value)).toBeUndefined();
  });
});
