import { objectValues } from '.';

describe('objectValues', () => {
  it('should behave identical to Object.values()', () => {
    const languages = {
      rust: 1,
      swift: 2,
      javascript: 3,
    } as const;

    expect(objectValues(languages)).toStrictEqual(Object.values(languages));

    expect(objectValues(languages)).toStrictEqual([1, 2, 3]);
  });
});
