import { range } from './range';

describe('range 함수는', () => {
  it('start부터 end-1까지의 범위를 생성합니다.', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
  });

  it('end를 생략한 경우 start를 0, end를 start로 설정해서 range를 생성합니다.', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
  });

  it('range를 생성할 때 step으로 간격을 둘 수 있습니다.', () => {
    expect(range(1, 11, 3)).toEqual([1, 4, 7, 10]);
  });
});
