import {
  ceilToUnit,
  commaizeNumber,
  floorToUnit,
  formatBusinessRegistrationNumber,
  formatPhoneNumber,
  formatToKoreanNumber,
  formatToKRW,
  roundToUnit,
} from '.';

describe('Numbers', () => {
  test('floorToUnit', () => {
    expect(floorToUnit(320980, 10000)).toEqual(320000);
    expect(floorToUnit(1234.56, 10)).toEqual(1230);
    expect(floorToUnit(1234, 1)).toEqual(1234);
  });

  test('ceilToUnit', () => {
    expect(ceilToUnit(320980, 10000)).toEqual(330000);
    expect(ceilToUnit(1234.56, 10)).toEqual(1240);
    expect(ceilToUnit(1234, 1)).toEqual(1234);
  });

  test('roundToUnit', () => {
    expect(roundToUnit(320980, 10000)).toEqual(320000);
    expect(roundToUnit(1234.56, 10)).toEqual(1230);
    expect(roundToUnit(1234, 1)).toEqual(1234);
  });

  test('commaizeNumber', () => {
    expect(commaizeNumber(1234.1234)).toEqual('1,234.1234');
    expect(commaizeNumber(100)).toEqual('100');
    expect(commaizeNumber(100000000)).toEqual('100,000,000');
    expect(commaizeNumber('1234.1234')).toEqual('1,234.1234');
    expect(commaizeNumber('100')).toEqual('100');
    expect(commaizeNumber('100000000')).toEqual('100,000,000');
  });

  test('formatToKoreanNumber', () => {
    expect(formatToKoreanNumber(13209802)).toEqual('1,320만 9,802');
    expect(formatToKoreanNumber(200000)).toEqual('20만');
    expect(formatToKoreanNumber(100000000)).toEqual('1억');
    expect(formatToKoreanNumber(0)).toEqual('0');
  });

  test('formatToKRW', () => {
    expect(formatToKRW(13209802)).toEqual('1,320만 9,802원');
    expect(
      formatToKRW(13209802, {
        shouldHaveSpaceBeforeWon: true,
      })
    ).toEqual('1,320만 9,802 원');
  });

  test('formatPhoneNumber', () => {
    const testCases = {
      '027779999': '02-777-9999',
      '0215994905': '02-1599-4905',
      '0317779999': '031-777-9999',
      '03177779999': '031-7777-9999',
      '0110003333': '011-000-3333',
      '01100003333': '011-0000-3333',
      '01011112222': '010-1111-2222',
    };

    for (const [testCase, expected] of Object.entries(testCases)) {
      expect(formatPhoneNumber(testCase)).toEqual(expected);
    }
  });

  test('formatBusinessRegistrationNumber', () => {
    expect(formatBusinessRegistrationNumber('0000000000')).toEqual('000-00-00000');
    expect(() => {
      formatBusinessRegistrationNumber('');
    }).toThrow('사업자등록번호는 반드시 길이가 10 이어야 합니다.');
    expect(() => {
      formatBusinessRegistrationNumber('abcdefghij');
    }).toThrow('사업자등록번호는 [0-9] 이어야 합니다.');
    expect(() => {
      formatBusinessRegistrationNumber('0x12345678');
    }).toThrow('사업자등록번호는 [0-9] 이어야 합니다.');
  });
});
