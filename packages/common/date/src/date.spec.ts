import { getDateDistance, getDateDistanceText, parseYYYYMMDD, TimeUnits } from './index';

describe('parseYYYYMMDD', () => {
  it('"2020-04-23" parsing to "2020년 4월 23일".', () => {
    const date = parseYYYYMMDD('2020-04-23');

    expect(date.getFullYear()).toEqual(2020);
    expect(date.getMonth()).toEqual(3);
    expect(date.getDate()).toEqual(23);
  });

  it('"2020-13-02" is throw error.', () => {
    expect(() => parseYYYYMMDD('2020-13-02')).toThrow('Invalid date format');
  });

  it('"2020-01-32" is throw error.', () => {
    expect(() => parseYYYYMMDD('2020-01-32')).toThrow('Invalid date format');
  });
});

describe('getDateDistance', () => {
  it('Returns the difference between two Dates in "일, 시, 분, 초".', () => {
    const startDate = new Date('2020-07-01 12:00:00');
    const endDate = new Date('2020-07-02 13:01:01');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1 });
  });

  it('If "endDate" is faster than "startDate" returns all 0.', () => {
    const startDate = new Date('2020-07-02 13:01:01');
    const endDate = new Date('2020-07-01 12:00:00');

    expect(getDateDistance(startDate, endDate)).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  });
});

describe('getDateDistanceText', () => {
  describe('Delimiter', () => {
    it(`Default value is empty string ' ' and returns '1일 1시간 1분 1초'.`, () => {
      expect(
        getDateDistanceText({
          days: 1,
          hours: 1,
          minutes: 1,
          seconds: 1,
        })
      ).toEqual('1일 1시간 1분 1초');
    });

    it(`If Delimiter is '.', returns '1일.1시간.1분.1초'.`, () => {
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
    it(`'1일 1시간 1분 1초' -> '1일 1시간 1분 1초'`, () => {
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

    it(`'1일 1초' -> '1일 1시간 1분 1초'`, () => {
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

    it(`'1일 1분 1초' -> '1일'`, () => {
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

    it(`'1일 1시간 1분 1초' -> '1일 1시간'`, () => {
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

    it(`'1시간 1분 1초' -> '1시간'`, () => {
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

    it(`'1분 1초' -> '1분 1초'`, () => {
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

    it(`'1초' -> '1초'`, () => {
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
    it("When don`t wants show '일' unit.", () => {
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

    it("When don`t wants show '시간' unit.", () => {
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

    it("When don`t wants show '분' unit.", () => {
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

    it("When don`t wants show '초' unit.", () => {
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
