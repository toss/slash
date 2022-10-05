import { sum } from './sum';

describe('sum은', () => {
  it('인자로 받은 숫자들의 합을 반환합니다.', () => {
    expect(sum(1, 2, 3)).toBe(6);
  });

  it('인자로 받은 배열의 숫자들을 합하여 반환합니다.', () => {
    expect(sum([1, 2, 3])).toBe(6);
  });
});
