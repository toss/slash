import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { DISASSEMBLED_CONSONANTS_BY_CONSONANT, DISASSEMBLED_VOWELS_BY_VOWEL } from './constants';

/**
 * @name disassembleHangulToGroups
 * @description
 * 한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리합니다.
 * `ㄵ`와 같은 겹자음은 `'ㄴㅈ'`와 같이 풀고, `ㅘ`와 같은 겹모음은 `'ㅗㅏ'`와 같이 풉니다.
 *
 * 자세한 예시는 아래 Example을 참고하세요.
 *
 * ```typescript
 * disassembleHangulToGroups(
 *   // 분리할 한글 문자열
 *   str: string
 * ): string[][]
 * @example
 * disassembleHangulToGroups('값')      // [['ㄱ', 'ㅏ', 'ㅂ', 'ㅅ']]
 * disassembleHangulToGroups('토스 짱')  // [['ㅌ', 'ㅗ'], ['ㅅ', 'ㅡ'], [' '], ['ㅉ', 'ㅏ', 'ㅇ']]
 * disassembleHangulToGroups('ㅘ')      // [['ㅗ', 'ㅏ']]
 * disassembleHangulToGroups('ㄵ')      // [['ㄴ', 'ㅈ']]
 */
export function disassembleHangulToGroups(str: string) {
  /*
   * FIXME(@raon0211):
   * Array#map을 사용하는 경우 Safari에서 'Array size is not a small enough positive integer' 오류가 발생함.
   * 우선 map을 사용하지 않음으로써 문제를 회피함
   * @see https://sentry.io/organizations/toss/issues/2432344954/?project=1242586&referrer=slack
   * @see https://bugs.webkit.org/show_bug.cgi?id=211619
   */
  const result: string[][] = [];

  for (const letter of str) {
    const disassembledComplete = disassembleCompleteHangulCharacter(letter);

    if (disassembledComplete != null) {
      result.push([...disassembledComplete.first, ...disassembledComplete.middle, ...disassembledComplete.last]);
      continue;
    }

    const disassembledConsonant = DISASSEMBLED_CONSONANTS_BY_CONSONANT[letter];

    if (disassembledConsonant != null) {
      result.push([...disassembledConsonant]);
      continue;
    }

    const disassembledVowel = DISASSEMBLED_VOWELS_BY_VOWEL[letter];

    if (disassembledVowel != null) {
      result.push([...disassembledVowel]);
      continue;
    }

    result.push([letter]);
  }

  return result;
}

/**
 * @name disassembleHangul
 * @description
 * 한글 문자열을 글자별로 초성/중성/종성 단위로 완전히 분리하여, 하나의 문자열로 만듭니다.
 *
 * 자세한 예시는 아래 Example을 참고하세요.
 *
 * ```typescript
 * disassembleHangul(
 *   // 분리할 한글 문자열
 *   str: string
 * ): string
 * @example
 * disassembleHangulToGroups('값')         // 'ㄱㅏㅂㅅ'
 * disassembleHangulToGroups('값이 비싸다')  // 'ㄱㅏㅂㅅㅇㅣ ㅂㅣㅆㅏㄷㅏ'
 * disassembleHangulToGroups('ㅘ')         // 'ㅗㅏ'
 * disassembleHangulToGroups('ㄵ')         // 'ㄴㅈ'
 */
export function disassembleHangul(str: string) {
  return disassembleHangulToGroups(str).reduce((hanguls, disassembleds) => `${hanguls}${disassembleds.join('')}`, '');
}
