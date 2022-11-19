import { omit } from '.';

describe('omit', () => {
  it('should create an object without given keys', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    expect(omit(country, [])).toStrictEqual(country);

    expect(omit(country, ['JP'])).toStrictEqual({
      KR: 'KR',
      US: 'US',
    });

    expect(omit(country, ['JP', 'US'])).toStrictEqual({
      KR: 'KR',
    });
  });
});
