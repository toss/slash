import { omit } from '.';

describe('omit', () => {
  it('should work well array of keys is empty', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(omit(country, [])).toStrictEqual(country);
  });

  it('should work with proper keys', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(omit(country, ['JP'])).toStrictEqual({
      KR: 'KR',
      US: 'US',
    });

    expect(omit(country, ['JP', 'US'])).toStrictEqual({
      KR: 'KR',
    });
  });
});
