/** @tossdocs-ignore */
import { HANGUL_CHARACTERS_BY_FIRST_INDEX } from './constants';
import { disassembleHangulToGroups } from './disassembleHangulToGroups';
import { getFirstConsonants } from './utils';

export function chosungIncludes(x: string, y: string) {
  if (!isOnlyInitialConsonant(y)) {
    return false;
  }

  const initialConsonantsX = getFirstConsonants(x).replace(/\s/g, '');
  const initialConsonantsY = getFirstConsonants(y).replace(/\s/g, '');

  return initialConsonantsX.includes(initialConsonantsY);
}

/*
 * @description 한글초성으로만 주어진 경우
 */
function isOnlyInitialConsonant(str: string) {
  return disassembleHangulToGroups(str).every(disassembled => {
    return disassembled.length === 1 && HANGUL_CHARACTERS_BY_FIRST_INDEX.includes(disassembled[0] ?? '');
  });
}
