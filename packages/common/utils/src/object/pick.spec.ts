import { pick } from '.';

describe('pick', () => {
  it('should work well array of keys is empty', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(pick(country, [])).toStrictEqual({});
  });

  it('should work with proper keys', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(pick(country, ['JP'])).toStrictEqual({
      JP: 'JP',
    });

    expect(pick(country, ['JP', 'US'])).toStrictEqual({
      US: 'US',
      JP: 'JP',
    });
  });
});
