import { parseName } from './parseName';

describe('parseName', () => {
  it('should separate two-letter name into [last name, first name]', () => {
    expect(parseName('김신')).toStrictEqual(['김', '신']);
    expect(parseName('이한')).toStrictEqual(['이', '한']);
  });
  it('should separate three-letter name which have one-letter last name not two-letter last names into [last name, first name]', () => {
    expect(parseName('오창영')).toStrictEqual(['오', '창영']);
  });
  it(`should separate three-letter name which have two-letter last name not one-letter last names into ['', full name]`, () => {
    expect(parseName('남궁민')).toStrictEqual(['', '남궁민']);
  });
  it(`should separate over four-letter name into ['', full name]`, () => {
    expect(parseName('김나박이')).toStrictEqual(['', '김나박이']);
  });
  it(`should separate name into ['', full name] if name is not a Korean name`, () => {
    expect(parseName('John Doe')).toStrictEqual(['', 'John Doe']);
  });
});
