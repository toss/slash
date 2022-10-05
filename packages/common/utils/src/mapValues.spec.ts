import { mapValues } from './mapValues';

describe('mapValues는', () => {
  it('오브젝트를 map한다.', () => {
    expect(mapValues({ foo: 1, bar: 2 }, x => x * 2)).toEqual({ foo: 2, bar: 4 });
  });

  it('enum을 map한다.', () => {
    enum Foo {
      bar = 'bar',
      baz = 'baz',
      quux = 'quux',
    }

    // { bar: 'hi bar', baz: 'hi baz', quux: 'hi quux' }
    expect(mapValues(Foo, x => `hi ${x}`)).toEqual({
      bar: 'hi bar',
      baz: 'hi baz',
      quux: 'hi quux',
    });
  });
});
