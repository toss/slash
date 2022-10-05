import { chosungIncludes } from './chosungIncludes';

describe('chosungIncludes', () => {
  it('"프론트엔드" 검색 시 "ㅍㄹㅌ" 를 입력하면 true 가 반환됩니다.', () => {
    expect(chosungIncludes('프론트엔드', 'ㅍㄹㅌ')).toBe(true);
  });
  it('"00프론트엔드" 검색 시 "ㅍㄹㅌ" 를 입력하면 true 가 반환됩니다.', () => {
    expect(chosungIncludes('00프론트엔드', 'ㅍㄹㅌ')).toBe(true);
  });

  it('"프론트엔드" 검색 시 "ㅍㅌ" 를 입력하면 false 가 반환됩니다.', () => {
    expect(chosungIncludes('프론트엔드', 'ㅍㅌ')).toBe(false);
  });

  it('"프론트엔드" 검색 시 "푸롴트" 를 입력하면 초성만입력하지 않아 false 가 반환됩니다.', () => {
    expect(chosungIncludes('프론트엔드', '푸롴트')).toBe(false);
  });
});
