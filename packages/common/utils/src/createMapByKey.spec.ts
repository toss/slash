import { createMapByKey } from './createMapByKey';

describe('createMapByKey는', () => {
  it('Entity의 배열에서 id를 키로 하는 Map을 만들어 반환합니다.', () => {
    const func = () => {};
    const entities = [
      { id: 1, value: 'foo' },
      { id: 2, value: 'bar' },
      { id: func, value: 'boo' },
    ];
    const mapById = createMapByKey(entities, 'id');
    expect(mapById.get(0)).toBe(undefined);
    expect(mapById.get(1)).toBe(entities[0]);
    expect(mapById.get(2)).toBe(entities[1]);
    expect(mapById.get(3)).toBe(undefined);
    expect(mapById.get(func)).toBe(entities[2]);
  });
});
