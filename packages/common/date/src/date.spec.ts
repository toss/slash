import { getDateDistance, getDateDistanceText, parseYYYYMMDD, roundUpHoursInDays, TimeUnits } from './index';

describe('roundUpHoursInDays', () => {
  it('should be raised to 24 hours, if less than 24 hours', () => {
    expect(roundUpHoursInDays(1)).toBe(24);
    expect(roundUpHoursInDays(23)).toBe(24);
  });

  it('should remain the same, 24 hour unit time', () => {
    expect(roundUpHoursInDays(24)).toBe(24);
    expect(roundUpHoursInDays(48)).toBe(48);
  });

  it('should be rounded up to the next 24-hour unit if more than 24 hours', () => {
    expect(roundUpHoursInDays(25)).toBe(48);
    expect(roundUpHoursInDays(47)).toBe(48);
    expect(roundUpHoursInDays(49)).toBe(72);
    expect(roundUpHoursInDays(63)).toBe(72);
  });

  it('should be maintained as 0 hours', () => {
    expect(roundUpHoursInDays(0)).toBe(0);
  });

  it('should handle negative inputs, which may cause unexpected behavior', () => {
    expect(roundUpHoursInDays(-1)).toBe(24);
    expect(roundUpHoursInDays(-25)).toBe(0);
  });
});

describe('parseYYYYMMDD', () => {
  it('should "2020-04-23" parsed to "April 23, 2020".', () => {
    const date = parseYYYYMMDD('2020-04-23');

    expect(date.getFullYear()).toEqual(2020);
    expect(date.getMonth()).toEqual(3);
    expect(date.getDate()).toEqual(23);
  });

  it('should throw error when month is invalid.', () => {
    expect(() => parseYYYYMMDD('2020-13-02')).toThrow('Invalid date format');
    expect(() => parseYYYYMMDD('2020-14-02')).toThrow('Invalid date format');
    expect(() => parseYYYYMMDD('2020-31-02')).toThrow('Invalid date format');
  });

  it('should throw error when days is invalid.', () => {
    expect(() => parseYYYYMMDD('2020-01-32')).toThrow('Invalid date format');
    expect(() => parseYYYYMMDD('2020-01-42')).toThrow('Invalid date format');
    expect(() => parseYYYYMMDD('2020-01-52')).toThrow('Invalid date format');
  });
});

describe('getDateDistance', () => {
  it('should return the difference between two Dates in "days, hours, minutes, seconds".', () => {
    const startDate = new Date('2020-07-01 12:00:00');
    const endDate = new Date('2020-07-02 13:01:01');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });

  it('should return all 0 when "endDate" is faster than "startDate".', () => {
    const startDate = new Date('2020-07-02 13:01:01');
    const endDate = new Date('2020-07-01 12:00:00');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});

describe('getDateDistanceText', () => {
  describe('Delimiter', () => {
    it('should delimit with " " that is default value.', () => {
      expect(
        getDateDistanceText({
          days: 1,
          hours: 1,
          minutes: 1,
          seconds: 1,
        })
      ).toEqual('1일 1시간 1분 1초');
    });

    it(`should return '1일.1시간.1분.1초' when separator value is '.'.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          {
            separator: '.',
          }
        )
      ).toEqual('1일.1시간.1분.1초');
    });
  });

  describe('If there is no any condition, unit with 0 value is not showing in return value.', () => {
    const conditionOption = {};
    it(`should return '1일 1시간 1분 1초' when all time value is 1`, () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          conditionOption
        )
      ).toEqual('1일 1시간 1분 1초');
    });

    it(`should return '1일 1초' when days and seconds value is 1.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 0,
            minutes: 0,
            seconds: 1,
          },
          conditionOption
        )
      ).toEqual('1일 1초');
    });
  });

  describe(`If there are values of "day" and "hour" units, only "day" and "hour" units are shown, and if there are no two values, only "minute" and "second" units are shown.`, () => {
    const conditionOptions = {
      days: (t: TimeUnits) => t.days > 0,
      hours: (t: TimeUnits) => t.hours > 0,
      minutes: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.minutes > 0,
      seconds: (t: TimeUnits) => !(t.days > 0 || t.hours > 0) && t.seconds > 0,
    };

    it(`should return '1일' when time value is '1일 1분 1초' with conditionOptions.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 0,
            minutes: 1,
            seconds: 1,
          },
          conditionOptions
        )
      ).toEqual('1일');
    });

    it(`should return '1일 1시간' when time value '1일 1시간 1분 1초' with conditionOptions.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          conditionOptions
        )
      ).toEqual('1일 1시간');
    });

    it(`should return '1시간' when time value is '1시간 1분 1초' with conditionOptions.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 0,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          conditionOptions
        )
      ).toEqual('1시간');
    });

    it(`should return '1분 1초' when time value is '1분 1초' with conditionOptions.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 0,
            hours: 0,
            minutes: 1,
            seconds: 1,
          },
          conditionOptions
        )
      ).toEqual('1분 1초');
    });

    it(`should return '1초' when time value is '1초' with conditionOptions.`, () => {
      expect(
        getDateDistanceText(
          {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 1,
          },
          conditionOptions
        )
      ).toEqual('1초');
    });
  });

  describe('When don`t wants show specific units', () => {
    it("should not show '일' unit.", () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          {
            days: () => false,
          }
        )
      ).toEqual('1시간 1분 1초');
    });

    it("should not show '시간' unit.", () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          {
            hours: () => false,
          }
        )
      ).toEqual('1일 1분 1초');
    });

    it("should not show '분' unit.", () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          {
            minutes: () => false,
          }
        )
      ).toEqual('1일 1시간 1초');
    });

    it("should not show '초' unit.", () => {
      expect(
        getDateDistanceText(
          {
            days: 1,
            hours: 1,
            minutes: 1,
            seconds: 1,
          },
          {
            seconds: () => false,
          }
        )
      ).toEqual('1일 1시간 1분');
    });
  });
});
