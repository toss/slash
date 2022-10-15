// eslint-disable-next-line import/no-duplicates
import { format as _format, isAfter, isBefore, isEqual, isValid } from 'date-fns';
import locale from 'date-fns/locale/ko/index.js';

// eslint-disable-next-line import/no-duplicates
/**
 * @name DateFnsDateType
 * @description
 * `date-fns` 라이브러리에서 사용하는 `Date`의 타입을 나타냅니다. (`number | Date`)
 */
export type DateFnsDateType = number | Date;

/**
 * @name kstFormat
 * @description
 * 한국 시간(KST) 기준으로 문자열을 포매팅하는 함수입니다.
 * [ISO 8601](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) 형식으로 Date를 포매팅하려고 할 때 유용합니다.
 *
 * 이 함수를 사용하지 않으면, `date-fns/locale/ko` 를 매번 import 하여 사용해야 합니다.
 *
 * ```typescript
 * kstFormat(
 *   // 포매팅할 날짜 (`number | Date`)
 *   date: DateFnsDateType,
 *   // 포맷 (문자열의 형식은 https://date-fns.org/v2.29.3/docs/format 을 참조하세요)
 *  format: string
 * ): string
 * ```
 * @example
 * import { kstFormat } from '@toss/date';
 *
 * // 한국 시간 (GMT+9) 기준으로 Date를 ISO 8601 문자열로 바꿉니다.
 * kstFormat(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
 *
 * @example
 * // kstFormat은 아래 코드와 동일합니다.
 * import { format } from 'date-fns';
 * import locale from 'date-fns/locale/ko';
 *
 * format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX", { locale });
 */
export const kstFormat = (date: DateFnsDateType, format: string) => _format(date, format, { locale });

/**
 * @name roundUpHoursInDays
 * @description
 * 24시간 단위로 올림합니다.
 * ```typescript
 * roundUpHoursInDays(
 *   // 24시간 단위로 올림할 시간
 *   hours: number
 * ): number
 * ```
 * @example
 * roundUpHoursInDays(48) => 48
 * roundUpHoursInDays(35) => 48
 * roundUpHoursInDays(8) => 24
 * roundUpHoursInDays(0) => 0
 */
export const roundUpHoursInDays = (hours: number) => {
  const remainder = hours % 24;
  return remainder === 0 ? hours : hours + 24 - (hours % 24);
};

/**
 * @name parseYYYYMMDD
 * @description
 * 문자열을 `Date` 객체로 바꿉니다. 만약에 문자열을 `Date` 로 바꾸지 못한다면, `new Error('Invalid date format')` 을 throw 합니다.
 * ```typescript
 * parseYYYYMMDD(
 *   // Date로 파싱할 문자열
 *   yyyyMMdd: string
 * ): Date
 * ```
 * @example
 * parseYYYYMMDD('2022-09-10')
 */
export function parseYYYYMMDD(yyyyMMdd: string) {
  const date = new Date(yyyyMMdd);
  if (isValid(date)) {
    return date;
  }
  throw new Error('Invalid date format');
}

/**
 * @name getDateDistance
 * @description
 * 두 개의 `Date`가 가리키는 시간의 차이를 '일', '시간', '분', '초' 단위로 계산합니다.
 * 계산하는 시간의 차이는 `endDate - startDate` 입니다. `startDate` 가 `endDate` 보다 나중이면, `0` 을 반환합니다.
 * ```typescript
 * getDateDistance(
 *   // 시작 시간
 *   startDate: Date,
 *   // 끝 시간
 *   endDate: Date
 * ): { days: number; hours: number; minutes: number; seconds: number };
 * ```
 * @example
 * const startDate = new Date(2022, 8, 10);
 * const endDate = new Date(2022, 8, 11);
 *
 * getDateDistance(startDate, endDate);
 * // -> { days: 1, hours: 0, minutes: 0, seconds: 0 }
 */
export function getDateDistance(startDate: Date, endDate: Date) {
  const SECOND_TO_MS = 1000;
  const MINUTE_TO_MS = 1000 * 60;
  const HOUR_TO_MS = 1000 * 60 * 60;
  const DAY_TO_MS = 1000 * 60 * 60 * 24;

  const endTime = endDate.getTime();
  const startTime = startDate.getTime();
  const distance = endTime - startTime;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / DAY_TO_MS),
    hours: Math.floor((distance % DAY_TO_MS) / HOUR_TO_MS),
    minutes: Math.floor((distance % HOUR_TO_MS) / MINUTE_TO_MS),
    seconds: Math.floor((distance % MINUTE_TO_MS) / SECOND_TO_MS),
  };
}

/**
 * @name isEqualOrBefore
 * @description
 * 첫 번째 Date가 두 번째 Date와 같거나 빠른지를 판단합니다.
 *
 * date-fns의 `isEqual || isBefore` 값을 반환합니다.
 * - [isEqual](https://date-fns.org/v2.29.3/docs/isEqual)
 * - [isBefore](https://date-fns.org/v2.29.3/docs/isBefore)
 * ```typescript
 * isEqualOrBefore(
 *   // 계산할 첫번째 Date
 *   lhs: Date,
 *   // 계산할 두번째 Date
 *   rhs: Date
 * ): boolean
 * ```
 * @example
 * isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 8, 10)) // true
 * isEqualOrBefore(new Date(2022, 9, 10), new Date(2022, 8, 10)) // false
 * isEqualOrBefore(new Date(2022, 8, 10), new Date(2022, 9, 10)) // true
 */
export function isEqualOrBefore(lhs: Date, rhs: Date) {
  return isEqual(lhs, rhs) || isBefore(lhs, rhs);
}

/**
 * @name isEqualOrAfter
 * @description
 * 첫 번째 Date가 두 번째 Date와 같거나 늦은지를 판단합니다.
 *
 * date-fns의 `isEqual || isAfter` 값을 반환합니다.
 * - [isEqual](https://date-fns.org/v2.29.3/docs/isEqual)
 * - [isAfter](https://date-fns.org/v2.29.3/docs/isAfter)
 * ```typescript
 * isEqualOrAfter(
 *   // 계산할 첫번째 Date
 *   lhs: Date,
 *   // 계산할 두번째 Date
 *   rhs: Date
 * ): boolean
 * ```
 * @example
 * isEqualOrAfter(new Date(2022, 8, 10), new Date(2022, 8, 10)) // true
 * isEqualOrAfter(new Date(2022, 9, 10), new Date(2022, 8, 10)) // true
 * isEqualOrAfter(new Date(2022, 8, 10), new Date(2022, 9, 10)) // false
 */
export function isEqualOrAfter(lhs: Date, rhs: Date) {
  return isEqual(lhs, rhs) || isAfter(lhs, rhs);
}

export type TimeUnits = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface Options {
  separator?: string;
  days?: (timeUnits: TimeUnits) => boolean;
  hours?: (timeUnits: TimeUnits) => boolean;
  minutes?: (timeUnits: TimeUnits) => boolean;
  seconds?: (timeUnits: TimeUnits) => boolean;
}

/**
 * @name getDateDistanceText
 * @description
 * `getDateDistance()` 가 반환하는 `TimeUnits` 값을 인자로 받아서, 읽기 좋은 형식으로 반환해줍니다.
 * ```typescript
 * getDateDistanceText(
 *   // getDateDistance가 반환한 시간의 차이 값
 *   timeUnits: TimeUnits,
 *   // 텍스트를 포매팅할 방법
 *   options: {
 *     // 일, 시, 분, 초를 구분할 separator
 *     // @default ' '
 *     separator?: string;
 *     // `일`을 포함할 기준
 *     // @default t => t.days > 0
 *     days?: (timeUnits: TimeUnits) => boolean;
 *     // `시간`을 포함할 기준
 *     // @default t => t.hours > 0
 *     hours?: (timeUnits: TimeUnits) => boolean;
 *     // `분`을 포함할 기준
 *     // @default t => t.minutes > 0
 *     minutes?: (timeUnits: TimeUnits) => boolean;
 *     // `초`를 포함할 기준
 *     // @default t => t.seconds > 0
 *     seconds?: (timeUnits: TimeUnits) => boolean;
 *   }
 * );
 * ```
 * @example
 * const startDate = new Date(2022, 8, 10);
 * const endDate = new Date(2022, 8, 11);
 *
 * const distance = getDateDistance(startDate, endDate);
 * getDateDistanceText(distance); // '1일'
 */
export function getDateDistanceText(timeUnits: TimeUnits, options: Options = {}) {
  const texts = [];
  const {
    separator = ' ',
    days: daysConditionFn = t => t.days > 0,
    hours: hoursConditionFn = t => t.hours > 0,
    minutes: minutesConditionFn = t => t.minutes > 0,
    seconds: secondsConditionFn = t => t.seconds > 0,
  } = options;

  if (daysConditionFn(timeUnits)) {
    texts.push(`${timeUnits.days}일`);
  }

  if (hoursConditionFn(timeUnits)) {
    texts.push(`${timeUnits.hours}시간`);
  }

  if (minutesConditionFn(timeUnits)) {
    texts.push(`${timeUnits.minutes}분`);
  }

  if (secondsConditionFn(timeUnits)) {
    texts.push(`${timeUnits.seconds}초`);
  }

  return texts.join(separator).trim();
}
