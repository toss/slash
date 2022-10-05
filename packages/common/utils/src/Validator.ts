import { sum } from './sum';
import { zip } from './zip';

/** 사업자번호 검증 고유 키 */
const BUSINESS_REG_NO_KEYS = [1, 3, 7, 1, 3, 7, 1, 3, 5];

/** @deprecated @tossteam/validators를 사용하세요 */
export class Validator {
  /**
   * @name Validator.isEmailValid
   * @description
   * 이메일 주소가 RFC 5322 표준을 따르는지 검사합니다. (https://emailregex.com/)
   * ```typescript
   * Validator.isEmailValid(
   *   // 올바른지 검증할 이메일 주소
   *   email: string
   * ): boolean
   * ```
   * @deprecated @tossteam/validators를 사용하세요
   * @param email 이메일 주소
   */
  public static isEmailValid(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /**
   * @name Validator.isBirthDateValid
   * @description
   * 주어진 문자열이 YYMMDD 형식의 날짜인지 검사합니다.
   * ```typescript
   * Validator.isBirthDateValid(
   *   // YYMMDD 형식의 날짜
   *   date: string
   * ): boolean
   * ```
   * @deprecated @tossteam/validators를 사용하세요
   */
  public static isBirthDateValid(birthDate: string) {
    const re = /^[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1])$/;
    return re.test(birthDate);
  }

  /**
   * @name Validator.isRrnValid
   * @description
   * 주어진 문자열이 2020년 10월 이전에 신고된 YYMMDDGHIJKLM 형식의 유효한 주민등록번호인지 검사합니다.
   * RRN: Resident Registration Number
   * https://ko.wikipedia.org/wiki/주민등록번호
   * ```typescript
   * Validator.isRrnValid(
   *   // '9801011000000' 형식의 주민번호
   *   rrn: string
   * ): boolean
   * ```
   * @warn 2020년 10월 이후에 주민등록번호를 새로 부여받거나 변경되는 경우 해당 로직의 동작이 올바르게 동작하지 않습니다.
   * @deprecated @tossteam/validators를 사용하세요
   */
  public static isRrnValid(val: string, { allowForeigner }: { allowForeigner?: boolean } = { allowForeigner: false }) {
    const len = val.length;
    if (len !== 13) {
      return false;
    }
    if (!this.isBirthDateValid(val.slice(0, 6))) {
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

  /**
   * @name Validator.isMobilePhone
   * @description
   * 주어진 문자열이 한국 휴대폰 번호인지 검사합니다.
   * https://github.com/chriso/validator.js/blob/b30c2cad0ad9593214c20b44d315ce7a0ffc4715/src/lib/isMobilePhone.js#L54
   *
   * ```typescript
   * Validator.isMobilePhone(
   *   // 검사할 휴대폰 번호
   *   phone: string,
   * ): boolean
   * ```
   * @deprecated @tossteam/validators를 사용하세요
   */
  public static isMobilePhone(phone: string) {
    const re = /^((\+?82)[ -]?)?0?1([0|1|6|7|8|9]{1})[ -]?\d{3,4}[ -]?\d{4}$/;
    return re.test(phone);
  }

  /**
   * @name Validator.isAge
   * 주어진 문자열이 유효한 나이 (숫자이고, 0보다 큰지) 인지 검사합니다.
   * ```typescript
   * Validator.isAge(
   *  // 검사할 나이 문자열 (e.g. '20')
   *  age: string,
   * ): boolean
   * ```
   */
  public static isAge(ageInput: string): boolean {
    if (!/^\d*$/.test(ageInput)) {
      return false;
    }

    return Number(ageInput) > 0;
  }

  /**
   * @name Validator.isKoreanLanguage
   * @description
   * 주어진 문자열이 한국어로 이루어져 있는지 검사합니다.
   * https://unicode.org/charts/PDF/UAC00.pdf
   * ```typescript
   * Validator.isKoreanLanguage(
   *   // 검사할 문자열
   *   str: string,
   * ): boolean
   * ```
   * @example
   * Validator.isKoreanLanguage('토스') // true
   * Validator.isKoreanLanguage('toss') // false
   * @deprecated @tossteam/validators를 사용하세요
   */
  public static isKoreanLanguage(text: string) {
    const re = /^[가-힣]+$/;
    return re.test(text);
  }

  /**
   * @name Validator.isBusinessRegNo
   * @description
   * 사업자번호 유효성 검사
   *
   * - http://seoulcredit.co.kr/business_id
   * - https://myhappyman.tistory.com/129
   *
   * ```typescript
   * Validator.isBusinessRegNo(
   *   // 검사할 사업자번호
   *   businessRegNo: string,
   * ): boolean
   * ```
   * @deprecated @tossteam/validators를 사용하세요
   */
  public static isBusinessRegNo(value: string) {
    const numberMap = [...value.replace(/-/gi, '')].map(v => parseInt(v, 10));

    if (numberMap.length !== 10) {
      return false;
    }

    const length = numberMap.length;

    const LAST_NUM = numberMap[length - 1];
    const targetNums = numberMap.slice(0, length - 1);

    const products = zip(BUSINESS_REG_NO_KEYS, targetNums).map(([x, y]) => x * y);
    const result = sum([...products, Math.floor(products[8]! / 10)]);

    return LAST_NUM === (10 - (result % 10)) % 10;
  }
}
