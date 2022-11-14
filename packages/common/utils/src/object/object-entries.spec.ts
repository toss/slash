import { objectEntries } from '.';

describe('objectEntries', () => {
  it('should behave identical to Object.entries()', () => {
    const languages = {
      rust: 1,
      swift: 2,
      javascript: 3,
    } as const;

    expect(objectEntries(languages)).toStrictEqual(Object.entries(languages));

    expect(objectEntries(languages)).toStrictEqual([
      ['rust', 1],
      ['swift', 2],
      ['javascript', 3],
    ]);
  });
});
