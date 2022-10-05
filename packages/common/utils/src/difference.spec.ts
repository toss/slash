import { difference, differenceWith } from './difference';

describe('difference는', () => {
  it('두 개의 배열의 차이를 반환한다.', () => {
    const a = [1, 2, 3, 4, 5];
    const b = [2, 3, 4, 5, 6];
    const result = difference(a, b);
    expect(result).toEqual([1]);
  });
});

describe('differenceWith는', () => {
  it('`areItemsEqual`이 가리키는 대로 잘 difference 연산을 수행한다', function () {
    const objects = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];

    expect(differenceWith(objects, [{ x: 1, y: 2 }], (a, b) => a.x === b.x && a.y === b.y)).toStrictEqual([objects[1]]);
  });
});
