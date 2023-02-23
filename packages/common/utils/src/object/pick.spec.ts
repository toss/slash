import { pick } from '.';

describe('pick', () => {
  it('should create an object composed of the given keys', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(pick(country, [])).toStrictEqual({});

    expect(pick(country, ['JP'])).toStrictEqual({
      JP: 'JP',
    });

    expect(pick(country, ['JP', 'US'])).toStrictEqual({
      US: 'US',
      JP: 'JP',
    });
  });
  it('should create an object composed of the given symbol keys', () => {
    const FooSymbol = Symbol('foo');
    const BarSymbol = Symbol('bar');

    const symbols = {
      [FooSymbol]: 'foo',
      [BarSymbol]: 'bar',
    } as const;

    expect(pick(symbols, [FooSymbol])).toStrictEqual({
      [FooSymbol]: 'foo',
    });

    expect(pick(symbols, [FooSymbol])).not.toStrictEqual({
      [FooSymbol]: 'foo',
      [BarSymbol]: 'bar',
    });
  });
});
