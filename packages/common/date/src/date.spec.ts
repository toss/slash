import { getDateDistance, getDateDistanceText, parseYYYYMMDD, TimeUnits } from './index';

describe('parseYYYYMMDD', () => {
  test('"2020-04-23"은 2020년 4월 23일로 파싱한다.', () => {
    const date = parseYYYYMMDD('2020-04-23');

    expect(date.getFullYear()).toEqual(2020);
    expect(date.getMonth()).toEqual(3);
    expect(date.getDate()).toEqual(23);
  });

  test('"2020-13-02"는 에러를 던진다.', () => {
    expect(() => parseYYYYMMDD('2020-13-02')).toThrow('Invalid date format');
  });

  test('"2020-01-32"는 에러를 던진다.', () => {
    expect(() => parseYYYYMMDD('2020-01-32')).toThrow('Invalid date format');
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

describe('getDateDistanceText', () => {
  describe('구분자', () => {
    it(`기본값이 공백 ' ' 이고 '1일 1시간 1분 1초' 가 나옵니다.`, () => {
      expect(
        getDateDistanceText({
          days: 1,
          hours: 1,
          minutes: 1,
          seconds: 1,
        })
      ).toEqual('1일 1시간 1분 1초');
    });

    it(`'.' 이라면 '1일.1시간.1분.1초' 가 나옵니다.`, () => {
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

  describe('아무 조건이 없다면 0인 값들의 단위들은 보여주지 않습니다.', () => {
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

  describe(`'일', '시간' 단위의 값이 있다면 '일', '시간' 단위만 보여지고, 두 값이 없다면 '분', '초' 단위만 보여준다.`, () => {
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

  describe(`특정 단위만 보여주고 싶지 않을 때`, () => {
    it(`'일' 단위는 보여지지 않는다.`, () => {
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

    it(`'시간' 단위는 보여지지 않는다.`, () => {
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

    it(`'분' 단위는 보여지지 않는다.`, () => {
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

    it(`'초' 단위는 보여지지 않는다.`, () => {
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
