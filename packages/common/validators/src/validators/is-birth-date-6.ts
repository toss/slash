/**
 * @name isBirthDate6
 * @description
 * 주어진 문자열이 올바른 생년월일 여섯자리인지 검증합니다.
 * ```typescript
 * function isBirthDate6(birthDate: string): boolean;
 * ```
 *
 * @example
 * isBirthDate6('980211');
 * // => true
 */
export function isBirthDate6(birthDate: string) {
  const re = /^[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1])$/;
  return re.test(birthDate);
}
