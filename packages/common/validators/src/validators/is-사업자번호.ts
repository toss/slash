/** @tossdocs-ignore */
import { sum, zip } from '@toss/utils';

const BUSINESS_REG_NO_KEYS = [1, 3, 7, 1, 3, 7, 1, 3, 5];

export function is사업자번호(value: string) {
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

export { is사업자번호 as isBusinessRegNo };
