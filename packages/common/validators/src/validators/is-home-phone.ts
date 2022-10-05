/**
 * @name isHomePhone
 * @description
 * 주어진 문자열이 집전화번호 (또는 인터넷 전화, 통신사업자 대표전화) 인지 확인합니다.
 * ```
 * function isHomePhone(value: string): boolean;
 * ```
 *
 * @example
 * isHomePhone('0215994905');
 * // => true
 */
export function isHomePhone(value: string) {
  return /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4])[ -]?\d{3,4}[ -]?\d{4}$/.test(value);
}
