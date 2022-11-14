import { objectKeys } from '.';

describe('objectKeys', () => {
  it('should behave identical to Object.Keys()', () => {
    const languages = {
      rust: 1,
      swift: 2,
      javascript: 3,
    } as const;

    expect(objectKeys(languages)).toStrictEqual(Object.keys(languages));

    expect(objectKeys(languages)).toStrictEqual(['rust', 'swift', 'javascript']);
  });
});
