import { iterateEnum } from './iterateEnum';

enum Language {
  KOR = 'KOR',
  ENG = 'ENG',
  JPN = 'JPN',
}

enum LanguageNum {
  KOR = 1,
  ENG = 2,
  JPN = 3,
}

export default describe('iterateEnum', () => {
  it('should iterate over string enum correctly', () => {
    const expectedArray = [Language.KOR, Language.ENG, Language.JPN];

    expect(iterateEnum(Language)).toEqual(expectedArray);
  });

  it('should iterate over number enum correctly', () => {
    const expectedArray = ['KOR', 'ENG', 'JPN'];

    expect(iterateEnum(LanguageNum)).toEqual(expectedArray);
  });

  it('should infer the correct type', () => {
    const result = iterateEnum(Language);
    const typeCheck: Language[] = result;

    expect(typeCheck).toBeTruthy();
  });
});
