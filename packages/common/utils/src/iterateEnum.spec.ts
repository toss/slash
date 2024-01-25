import { iterateEnum } from './iterateEnum';

enum Language {
  KOR = 'KOR',
  ENG = 'ENG',
  JPN = 'JPN',
}

export default describe('iterateEnum', () => {
  it('should iterate over enum correctly', () => {
    const expectedArray = [Language.KOR, Language.ENG, Language.JPN];

    expect(iterateEnum(Language)).toEqual(expectedArray);
  });

  it('should produce the same result as Object.keys', () => {
    const expectedArray = Object.keys(Language);

    expect(iterateEnum(Language)).toEqual(expectedArray);
  });

  it('should infer the correct type', () => {
    const result = iterateEnum(Language);
    const typeCheck: Language[] = result;

    expect(typeCheck).toBeTruthy();
  });
});
