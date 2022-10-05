import { sample } from './sample';

describe('sample은', () => {
  it('배열 중 임의의 값 하나를 반환한다.', () => {
    const value = [1, 2, 3];

    expect(value).toContain(sample(value));
  });

  it('빈 배열의 경우 undefined을 반환한다.', () => {
    expect(sample([])).toEqual(undefined);
  });
});
