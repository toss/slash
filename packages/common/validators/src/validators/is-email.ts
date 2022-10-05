/**
 * @name isEmail
 * @description
 * 이메일 주소가 RFC 5322 표준을 따르는지 검사합니다. (https://emailregex.com/)
 * ```
 * function isEmail(email: string): boolean;
 * ```
 *
 * @example
 * isEmail('raon0211@gmail.com') // true
 */
export function isEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { isEmail as isEmailValid };
