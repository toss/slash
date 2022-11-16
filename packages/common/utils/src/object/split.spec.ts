import { split } from '.';

describe('split', () => {
  it('should work well when given empty array', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    const [picked, omitted] = split(country, []);

    expect(picked).toStrictEqual({});
    expect(omitted).toStrictEqual(country);
  });

  it('should work well split object', () => {
    const country = {
      KR: 'KR',
      US: 'US',
      JP: 'JP',
    } as const;

    const [picked, omitted] = split(country, ['KR']);

    expect(picked).toStrictEqual({
      KR: 'KR',
    });
    expect(omitted).toStrictEqual({
      US: 'US',
      JP: 'JP',
    });
  });
});
