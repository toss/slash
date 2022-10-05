import { parseName } from './parseName';

describe('parseKoreanName', () => {
  it('두 글자 본명을 [성, 이름]으로 분류한다 ', () => {
    expect(parseName('김신')).toStrictEqual(['김', '신']);
    expect(parseName('이한')).toStrictEqual(['이', '한']);
  });
  it('세 글자 이름 중 두 글자 성이 아닌 본명을 [성, 이름]으로 분류한다 ', () => {
    expect(parseName('오창영')).toStrictEqual(['오', '창영']);
  });
  it(`세 글자 이름 중 두 글자 성인 본명을 ['', 본명]으로 분류한다 `, () => {
    expect(parseName('남궁민')).toStrictEqual(['', '남궁민']);
  });
  it(`네 글자 이상의 이름을 ['', 본명]으로 분류한다 `, () => {
    expect(parseName('김나박이')).toStrictEqual(['', '김나박이']);
  });
});
