import { uniqBy } from './uniqBy';

describe('uniqBy는', () => {
  it('hasher에 맞춰 잘 uniq 연산을 수행한다', () => {
    const result = uniqBy([{ key: 1 }, { key: 2 }, { key: 1 }], x => x.key);

    expect(result).toEqual([{ key: 1 }, { key: 2 }]);
  });
});
