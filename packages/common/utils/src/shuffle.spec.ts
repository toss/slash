import { shuffle } from './shuffle';

describe('shuffle 함수는', () => {
  it('새로운 array를 반환합니다', () => {
    const target = [1, 2, 3];
    const result = shuffle(target);
    expect(result).not.toBe(target);
  });

  it('입력받은 array의 모든 요소를 포함하는 array를 리턴합니다', () => {
    const target = [1, 2, 3];
    const result = shuffle(target);
    expect(result).toEqual(expect.arrayContaining(target));
  });

  it('입력 array와 리턴 array의 길이가 같습니다', () => {
    const target = [1, 2, 3];
    const result = shuffle(target);
    expect(result.length).toEqual(target.length);
  });
});
