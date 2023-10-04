import { identity } from './identity';

describe('identity', () => {
  it('should return the given argument as they are.', () => {
    const TEST_ITEMS = [
      1,
      'foo',
      false,
      undefined,
      null,
      Symbol(),
      { foo: 'bar' },
      ['foo', 'bar'],
      () => {},
      new Map(),
      new Set(),
      new Promise(() => {}),
      new Date(),
    ];

    for (const item of TEST_ITEMS) {
      expect(identity(item)).toBe(item);
    }
  });
});
