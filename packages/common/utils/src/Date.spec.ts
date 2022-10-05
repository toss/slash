import { parseYYYYMMDD, getDateDistance, roundUpHoursInDays } from './Date';

describe('roundUpHoursInDays', () => {
  test('24시간 단위로 올림한다.', () => {
    expect(roundUpHoursInDays(48)).toEqual(48);
    expect(roundUpHoursInDays(25)).toEqual(48);
    expect(roundUpHoursInDays(10)).toEqual(24);
    expect(roundUpHoursInDays(0)).toEqual(0);
  });
});

describe('parseYYYYMMDD', () => {
  test('"2020-04-23"은 2019년 4월 23일로 파싱한다.', () => {
    const date = parseYYYYMMDD('2020-04-23');

    expect(date?.getFullYear()).toEqual(2020);
    expect(date?.getMonth()).toEqual(3);
    expect(date?.getDate()).toEqual(23);
  });

  test('"2020-13-02"는 에러를 던진다.', () => {
    try {
      parseYYYYMMDD('2020-13-02');
    } catch (e: any) {
      expect(e.message).toBe('Invalid date format');
    }
  });

  test('"2020-01-32"는 에러를 던진다.', () => {
    try {
      parseYYYYMMDD('2020-01-32');
    } catch (e: any) {
      expect(e.message).toBe('Invalid date format');
    }
  });
});

describe('getDateDistance', () => {
  test('두 Date 간의 차이를 일, 시, 분, 초로 반환한다.', () => {
    const startDate = new Date('2020-07-01 12:00:00');
    const endDate = new Date('2020-07-02 13:01:01');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });

  test('endDate가 더 이를 경우 전부 0을 반환한다.', () => {
    const startDate = new Date('2020-07-02 13:01:01');
    const endDate = new Date('2020-07-01 12:00:00');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});
