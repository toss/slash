import { getFirstConsonants, hasBatchim } from './utils';

describe('hasBatchim', () => {
  it('should return true for the character "값"', () => {
    expect(hasBatchim('값')).toBe(true);
  });
  it('should return true for the character "공"', () => {
    expect(hasBatchim('공')).toBe(true);
  });
  it('should return false for the character "토"', () => {
    expect(hasBatchim('토')).toBe(false);
  });
  it('should return true for the character "읊"', () => {
    expect(hasBatchim('읊')).toBe(true);
  });
  it('should return false for the character "서"', () => {
    expect(hasBatchim('서')).toBe(false);
  });
});

describe('getFirstConsonants', () => {
  it('should extract the initial consonants "ㅌㅅ" from the word "토스"', () => {
    expect(getFirstConsonants('토스')).toBe('ㅌㅅ');
  });
  it('should extract the initial consonants "ㅍㄹㅌㅇㄷ" from the word "프론트엔드"', () => {
    expect(getFirstConsonants('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('should extract the initial consonants "ㄴㅈ" from the consonants "ㄴㅈ"', () => {
    expect(getFirstConsonants('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('should extract the initial consonants "ㄹㅇㅌ" from the word "리액트"', () => {
    expect(getFirstConsonants('리액트')).toBe('ㄹㅇㅌ');
  });

  it('should extract the initial consonants "ㄸㅇ ㅆㄱ" from the phrase "띄어 쓰기"', () => {
    expect(getFirstConsonants('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });
});
