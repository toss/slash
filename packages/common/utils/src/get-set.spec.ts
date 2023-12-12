import { get, set } from './get-set';

describe('get function', () => {
  describe('Returns a valid value.', () => {
    it('should correctly retrieve a value for a single-level property', () => {
      expect(get({ a: { b: { c: 'd' } } }, 'a')).toStrictEqual({ b: { c: 'd' } });
    });
    it('should correctly retrieve a value for a multi-level property', () => {
      expect(get({ a: { b: { c: 'd' } } }, 'a.b')).toStrictEqual({ c: 'd' });
      expect(get({ a: { b: { c: 'd' } } }, 'a.b.c')).toStrictEqual('d');
    });
    it('should return a default value when the specified path does not exist', () => {
      expect(get({ a: { b: { c: 'd' } } }, 'a.c', 'default')).toStrictEqual('default');
    });
    it('should ignore consecutive dots in path and retrieve the correct value', () => {
      expect(get({ a: { b: { c: 'd' } } }, 'a..b')).toStrictEqual({ c: 'd' });
    });
  });

  describe('Returns null or undefined', () => {
    it('should work correctly with empty objects', () => {
      expect(get({}, 'a')).toBeUndefined();
    });
    it('should handle paths leading to undefined or null values inside nested objects', () => {
      const obj = { a: { b: undefined, c: null } };
      expect(get(obj, 'a.b')).toBeUndefined();
      expect(get(obj, 'a.c')).toBeNull();
      expect(get(obj, 'a.b.d')).toBeUndefined();
    });
  });
});

describe('set function', () => {
  it('should correctly set a value for a single-level property', () => {
    expect(set({ a: { b: { c: 'd' } } }, 'a', 'e')).toStrictEqual({ a: 'e' });
  });
  it('should correctly set a value for a multi-level property', () => {
    expect(set({ a: { b: { c: 'd' } } }, 'a.b.c', 'e')).toStrictEqual({ a: { b: { c: 'e' } } });
  });
  it('should correctly add a new property at a multi-level path', () => {
    expect(set({ a: { b: { c: 'c' } } }, 'a.b.e', 'e')).toStrictEqual({ a: { b: { c: 'c', e: 'e' } } });
  });
  it('should handle incorrect path formats gracefully', () => {
    const obj = { a: { b: { c: 'd' } } };
    expect(set(obj, 'a..b', 'e')).toStrictEqual(obj);
  });
  it('should work correctly with empty objects', () => {
    expect(set({}, 'a', 'b')).toStrictEqual({ a: 'b' });
  });
});
