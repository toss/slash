/**
 * @name isAge
 * @description
 * 주어진 문자열이 유효한 나이인지 검사합니다.
 *
 * ```typescript
 * function isAge(ageInput: string): boolean;
 * ```
 *
 * @example
 * isAge('25') // true
 * isAge('asd') // false
 * isAge('24.3') // false
 */
export function isAge(ageInput: string): boolean {
  if (!/^\d*$/.test(ageInput)) {
    return false;
  }

  return Number(ageInput) > 0;
}
