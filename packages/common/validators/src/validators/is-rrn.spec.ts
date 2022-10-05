import { isRRN } from './is-rrn';

describe('isRRN', () => {
  it('should return `false` if given value is not valid', () => {
    expect(isRRN('19960729')).toEqual(false);
    expect(isRRN('9607291111111')).toEqual(false);
    expect(isRRN('')).toEqual(false);
    // 외국인 등록번호 테스트
    expect(isRRN('1111115111111')).toEqual(false); // 공식을 만족하는 외국인 등록번호
    expect(isRRN('1111115111110', { allowForeigner: true })).toEqual(false); // 공식을 만족하지 않는 외국인 등록번호
  });
  it('should return `true` if given value is valid', () => {
    // 개인 주민번호로 테스트해보았을 때 잘 동작했음 (아래는 공식을 만족하는 임의의 주민등록번호)
    expect(isRRN('1111111111118')).toEqual(true);
    // 외국인 등록번호 테스트 (아래는 공식을 만족하는 임의의 외국인등록번호)
    expect(isRRN('1111115111111', { allowForeigner: true })).toEqual(true);
  });
});
