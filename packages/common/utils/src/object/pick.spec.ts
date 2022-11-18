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
});
