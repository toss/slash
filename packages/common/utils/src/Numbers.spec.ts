import {
  ceilToUnit,
  commaizeNumber,
  decommaizeNumber,
  floorAndFormatNumber,
  floorToUnit,
  formatBusinessRegistrationNumber,
  formatPhoneNumber,
  formatToKoreanNumber,
  formatToKRW,
  roundToUnit,
} from '.';

describe('Numbers', () => {
  it('should round down "value" by "unit"', () => {
    expect(floorToUnit(320980, 10000)).toBe(320000);
    expect(floorToUnit(1234.56, 10)).toBe(1230);
    expect(floorToUnit(1234, 1)).toBe(1234);
    expect(floorToUnit(1206, -1)).toBe(1206);
  });

  it('should round up "value" by "unit"', () => {
    expect(ceilToUnit(320980, 10000)).toBe(330000);
    expect(ceilToUnit(1234.56, 10)).toBe(1240);
    expect(ceilToUnit(1234, 1)).toBe(1234);
    expect(floorToUnit(1206, -1)).toBe(1206);
  });

  it('should round "value" by "unit"', () => {
    expect(roundToUnit(320980, 10000)).toBe(320000);
    expect(roundToUnit(1234.56, 10)).toBe(1230);
    expect(roundToUnit(1234, 1)).toBe(1234);
    expect(roundToUnit(1206, -1)).toBe(1206);
  });

  it('should separate the given value by comma', () => {
    expect(commaizeNumber(1234.1234)).toBe('1,234.1234');
    expect(commaizeNumber(100)).toBe('100');
    expect(commaizeNumber(100000000)).toBe('100,000,000');
    expect(commaizeNumber('1234.1234')).toBe('1,234.1234');
    expect(commaizeNumber('100')).toBe('100');
    expect(commaizeNumber('100000000')).toBe('100,000,000');
  });

  it('should remove commas from number', () => {
    expect(decommaizeNumber('13,209,802')).toBe(13209802);
    expect(decommaizeNumber('12,341,234')).toBe(12341234);
  });

  it('should convert given number to korean expression', () => {
    expect(formatToKoreanNumber(13209802)).toBe('1,320만 9,802');
    expect(formatToKoreanNumber(200000)).toBe('20만');
    expect(formatToKoreanNumber(100000000)).toBe('1억');
    expect(formatToKoreanNumber(0)).toBe('0');
    expect(
      formatToKoreanNumber(12000, {
        formatAllDigits: true,
      })
    ).toBe('만 2천');
    expect(
      formatToKoreanNumber(840000, {
        floorUnit: 0,
      })
    ).toBe('84만');
  });

  it('should format the given number into korean currency format', () => {
    expect(formatToKRW(13209802)).toBe('1,320만 9,802원');
    expect(
      formatToKRW(13209802, {
        shouldHaveSpaceBeforeWon: true,
      })
    ).toEqual('1,320만 9,802 원');
    expect(
      formatToKRW(13209802, {
        floorUnit: 10000,
      })
    ).toEqual('1,320만원');
    expect(
      formatToKRW(13209802, {
        ceilUnit: 10000,
      })
    ).toEqual('1,321만원');
  });

  it('should separate the given phone number by hyphen(`-`)', () => {
    const testCases = {
      '027779999': '02-777-9999',
      '0215994905': '02-1599-4905',
      '0317779999': '031-777-9999',
      '03177779999': '031-7777-9999',
      '0110003333': '011-000-3333',
      '01100003333': '011-0000-3333',
      '01011112222': '010-1111-2222',
      '05012345678': '050-1234-5678',
      '050412345678': '0504-1234-5678',
    };

    for (const [testCase, expected] of Object.entries(testCases)) {
      expect(formatPhoneNumber(testCase)).toEqual(expected);
    }
  });

  it('should separate korean corporate registration number by hyphen(`-`).', () => {
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

  it('should round the given number and commaize', () => {
    expect(floorAndFormatNumber(123456789)).toBe('123,456,789');
    expect(floorAndFormatNumber(123456.098023)).toBe('123,456');
  });
});
