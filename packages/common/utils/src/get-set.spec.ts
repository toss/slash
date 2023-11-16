import { get, set } from './get-set';

describe('get function', () => {
  it('correctly retrieves a value for a single-level property', () => {
    expect(get({ a: { b: { c: 'd' } } }, 'a')).toStrictEqual({ b: { c: 'd' } });
  });

  it('correctly retrieves a value for a multi-level property', () => {
    expect(get({ a: { b: { c: 'd' } } }, 'a.b')).toStrictEqual({ c: 'd' });
    expect(get({ a: { b: { c: 'd' } } }, 'a.b.c')).toStrictEqual('d');
  });

  it('returns a default value when the specified path does not exist', () => {
    expect(get({ a: { b: { c: 'd' } } }, 'a.c', 'default')).toStrictEqual('default');
  });

  it('ignores consecutive dots in path and retrieves the correct value', () => {
    expect(get({ a: { b: { c: 'd' } } }, 'a..b')).toStrictEqual({ c: 'd' });
  });

  it('works correctly with empty objects', () => {
    expect(get({}, 'a')).toBeUndefined();
  });
});

describe('set function', () => {
  it('correctly sets a value for a single-level property', () => {
    expect(set({ a: { b: { c: 'd' } } }, 'a', 'e')).toStrictEqual({ a: 'e' });
  });

  it('correctly sets a value for a multi-level property', () => {
    expect(set({ a: { b: { c: 'd' } } }, 'a.b.c', 'e')).toStrictEqual({ a: { b: { c: 'e' } } });
  });

  it('correctly adds a new property at a multi-level path', () => {
    expect(set({ a: { b: { c: 'c' } } }, 'a.b.e', 'e')).toStrictEqual({ a: { b: { c: 'c', e: 'e' } } });
  });

  it('handles incorrect path formats gracefully', () => {
    // Assuming the function does not modify the object in case of an incorrect path
    const obj = { a: { b: { c: 'd' } } };
    expect(set(obj, 'a..b', 'e')).toStrictEqual(obj);
  });

  it('works correctly with empty objects', () => {
    expect(set({}, 'a', 'b')).toStrictEqual({ a: 'b' });
  });
});
