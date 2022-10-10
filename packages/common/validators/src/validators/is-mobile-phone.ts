/**
 * @name isMobilePhone
 * @description
 * 주어진 문자열이 한국 휴대폰 번호인지 검사합니다.
 * - https://github.com/chriso/validator.js/blob/b30c2cad0ad9593214c20b44d315ce7a0ffc4715/src/lib/isMobilePhone.js#L54
 * ```typescript
 * function isMobilePhone(
 *   // 휴대폰번호 문자열
 *   phone: string,
 * ): boolean
 * ```
 *
 * @example
 * isMobilePhone('01015994905');
 * // => true
 */
export function isMobilePhone(phone: string) {
  const re = /^((\+?82)[ -]?)?0?1([0|1|6|7|8|9]{1})[ -]?\d{3,4}[ -]?\d{4}$/;
  return re.test(phone);
}
