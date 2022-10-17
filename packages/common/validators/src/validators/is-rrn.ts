/** @tossdocs-ignore */
import { isBirthDate6 } from './is-birth-date-6';

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
