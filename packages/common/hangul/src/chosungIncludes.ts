/** @tossdocs-ignore */
import { HANGUL_CHARACTERS_BY_FIRST_INDEX } from './constants';
import { disassembleHangulToGroups } from './disassembleHangulToGroups';
import { getFirstConsonants } from './utils';

/**
 * @name chosungIncludes
 * @description
 * 문자열의 초성 일치 검색을 수행합니다.
 *
 * ```typescript
 * chosungIncludes(
 *   // 초성 일치하는지 검사할 문자열 (e.g. '프론트엔드')
 *   x: string,
 *   // 초성 문자열 (e.g. 'ㅍㄹㅌㅇㄷ')
 *   y: string
 * ): boolean
 * ```
 * @example
 * chosungIncludes('프론트엔드', 'ㅍㄹㅌ')   // true
 * chosungIncludes('00프론트엔드', 'ㅍㄹㅌ') // true
 * chosungIncludes('프론트엔드', 'ㅍㅌ')    // false
 * chosungIncludes('프론트엔드', '푸롴트')  // false
 */
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
