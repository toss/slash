/** @tossdocs-ignore */
import { disassembleHangulToGroups } from './disassemble';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';

/**
 * @name hasBatchim
 * @description
 * 한글 문자열의 마지막 글자가 받침이 있는지 확인합니다.
 * ```typescript
 * hasBatchim(
 *   // 글자에 받침이 있는지 확인하고 싶은 문자열
 *   str: string
 * ): boolean
 * ```
 * @example
 * hasBatchim('값') // true
 * hasBatchim('토') // false
 */
export function hasBatchim(str: string) {
  const lastChar = str[str.length - 1]!;
  const disassembled = disassembleCompleteHangulCharacter(lastChar);
  return disassembled !== undefined && disassembled.last !== '';
}

/**
 * @name getFirstConsonants
 * @description
 * 단어에서 초성을 추출합니다. (예: `토스` -> `'ㅌㅅ'`)
 * ```typescript
 * getFirstConsonants(
 *   // 초성을 추출할 단어
 *   word: string
 * ): string
 * ```
 * @example
 * getFirstConsonants('토스') // 'ㅌㅅ'
 * getFirstConsonants('리액트') // 'ㄹㅇㅌ'
 * getFirstConsonants('띄어 쓰기') // 'ㄸㅇ ㅆㄱ'
 */
export function getFirstConsonants(word: string) {
  return disassembleHangulToGroups(word).reduce((firstConsonants, [consonant]) => {
    return `${firstConsonants}${consonant}`;
  }, '');
}
