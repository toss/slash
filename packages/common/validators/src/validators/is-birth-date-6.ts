/** @tossdocs-ignore */
import { isValid, parse } from 'date-fns';

export function isBirthDate6(birthDate: string) {
  const parsed = parse(birthDate, 'yyMMdd', new Date());

  return isValid(parsed);
}
