import { getFirstConsonants, hasBatchim } from './utils';

describe('hasBatchim', () => {
  it('값', () => {
    expect(hasBatchim('값')).toBe(true);
  });
  it('공', () => {
    expect(hasBatchim('공')).toBe(true);
  });
  it('토', () => {
    expect(hasBatchim('토')).toBe(false);
  });
  it('읊', () => {
    expect(hasBatchim('읊')).toBe(true);
  });
  it('서', () => {
    expect(hasBatchim('서')).toBe(false);
  });
});

describe('getFirstConsonants', () => {
  it('토스', () => {
    expect(getFirstConsonants('토스')).toBe('ㅌㅅ');
  });
  it('프론트엔드', () => {
    expect(getFirstConsonants('프론트엔드')).toBe('ㅍㄹㅌㅇㄷ');
  });
  it('ㄴㅈ', () => {
    expect(getFirstConsonants('ㄴㅈ')).toBe('ㄴㅈ');
  });
  it('리액트', () => {
    expect(getFirstConsonants('리액트')).toBe('ㄹㅇㅌ');
  });

  it('띄어 쓰기', () => {
    expect(getFirstConsonants('띄어 쓰기')).toBe('ㄸㅇ ㅆㄱ');
  });
});
