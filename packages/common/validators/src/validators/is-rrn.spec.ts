import { isRRN } from './is-rrn';

describe('isRRN', () => {
  it('should return `false` if given value is not valid', () => {
    expect(isRRN('19960729')).toEqual(false);
    expect(isRRN('')).toEqual(false);
    // 마지막자리 검증공식 적용 테스트
    expect(isRRN('9607291111111', { validate7thDigit: true })).toEqual(false);

    // 외국인 등록번호 테스트
    expect(isRRN('1111115111111')).toEqual(false);
    // 마지막자리 검증공식을 만족하지 않는 외국인 등록번호
    expect(isRRN('1111115111110', { allowForeigner: true, validate7thDigit: true })).toEqual(false);
  });
  it('should return `true` if given value is valid', () => {
    // 1911년 남성일 경우, 성별코드는 1
    expect(isRRN('1111111012345')).toEqual(true);
    // 1922년 여성일 경우, 성별코드는 2
    expect(isRRN('2212222012345')).toEqual(true);
    // 2011년 남성일 경우, 성별코드는 3
    expect(isRRN('1111113012345')).toEqual(true);
    // 2022년 여성일 경우, 성별코드는 4
    expect(isRRN('2212224012345')).toEqual(true);

    // 외국인 등록번호 1955년 남성일 경우, 성별코드는 5
    expect(isRRN('5511115111111', { allowForeigner: true })).toEqual(true);
    // 외국인 등록번호 1966년 여성일 경우, 성별코드는 6
    expect(isRRN('6611116012345', { allowForeigner: true })).toEqual(true);
    // 외국인 등록번호 2011년 남성일 경우, 성별코드는 7
    expect(isRRN('1101017111111', { allowForeigner: true })).toEqual(true);
    // 외국인 등록번호 2022년 여성일 경우, 성별코드는 8
    expect(isRRN('2201018012345', { allowForeigner: true })).toEqual(true);

    // 개인 주민번호로 테스트해보았을 때 잘 동작했음 (아래는 공식을 만족하는 임의의 주민등록번호)
    expect(isRRN('1111111111118', { validate7thDigit: true })).toEqual(true);
    // 외국인 등록번호 테스트 (아래는 공식을 만족하는 임의의 외국인등록번호)
    expect(isRRN('1111115111111', { allowForeigner: true, validate7thDigit: true })).toEqual(true);
  });
});
