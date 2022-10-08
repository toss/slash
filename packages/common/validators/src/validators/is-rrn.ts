import { isBirthDate6 } from './is-birth-date-6';

/**
 * @note 2020년 10월 이후에 주민등록번호를 새로 부여받거나 변경되는 경우 해당 로직의 동작이 올바르게 동작하지 않습니다.
 * @name isRRN
 * @description
 * 주어진 문자열이 2020년 10월 이전에 신고된 YYMMDDGHIJKLM 형식의 유효한 주민등록번호인지 검사합니다.
 * - RRN: Resident Registration Number
 * - https://ko.wikipedia.org/wiki/주민등록번호
 * - warning: 2020년 10월 이후에 주민등록번호를 새로 부여받거나 변경되는 경우 해당 로직의 동작이 올바르게 동작하지 않습니다.
 * ```typescript
 * function isRRN(
 *   // 13자 길이의 대한민국 주민등록번호
 *   val: string,
 *   options?: {
 *     // @default false
 *     allowForeigner?: boolean;
 *   },
 * ): boolean;
 * ```
 */
export function isRRN(val: string, { allowForeigner }: { allowForeigner?: boolean } = { allowForeigner: false }) {
  const len = val.length;
  if (len !== 13) {
    return false;
  }
  if (!isBirthDate6(val.slice(0, 6))) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < len - 1; i = i + 1) {
    const multiply = (i % 8) + 2;
    const subResult = Number(val[i]) * multiply;
    sum = sum + subResult;
  }

  let validateFactor = 11;

  // allowForeigner = true인 경우 외국인 등록번호를 검증 factor를 설정한다.
  const firstChar = val[6];
  if (allowForeigner && (firstChar === '5' || firstChar === '6' || firstChar === '7' || firstChar === '8')) {
    validateFactor = 13; // 외국인용 검증 factor
  }

  const expectedLastChar = (validateFactor - (sum % 11)) % 10;
  return expectedLastChar === Number(val[len - 1]);
}

export { isRRN as is주민등록번호 };
