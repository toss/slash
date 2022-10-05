/** @tossdocs-ignore */
import { differenceInCalendarMonths, formatISO, parseISO } from 'date-fns';

/**
 * @name toInsuranceAge
 * @description
 * 기준일을 기점으로 `보험 나이`를 계산해 줍니다.
 *
 * `보험 나이`란?
 * 보험나이는 실제 만 나이를 기준으로 6개월 미만의 끝수는 버리고 6개월
 * 이상의 끝수는 1년으로 하여 계산하는 나이입니다. 쉽게 생각해 만 나이보다
 * 6개월이 많은 나이라고 할 수 있습니다. 생일보다 6개월이 앞선 날짜를
 * 상령일이라고해서 그 날을 기준으로 보험나이가 오르게 됩니다.
 *
 * ```typescript
 * toInsuranceAge(
 *   // 생년월일 (e.g. '1998-01-01')
 *   date: string,
 *   // 기준일 (e.g. '2022-09-21')
 *   baseDate?: string
 * ): number // => 보험 나이
 * ```
 */
export const toInsuranceAge = (date: string, baseDate = formatISO(new Date())) => {
  const diff = differenceInCalendarMonths(parseISO(baseDate), parseISO(date));
  const baseAge = (diff - (diff % 12)) / 12;
  const extraAge = diff % 12 < 6 ? 0 : 1;
  return baseAge + extraAge;
};
