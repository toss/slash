/** @tossdocs-ignore */
import { DISASSEMBLED_CONSONANTS_BY_CONSONANT, DISASSEMBLED_VOWELS_BY_VOWEL } from './constants';
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';

/**
 * This method has been moved to the es-hangul library.
 * Please use es-hangul for this functionality going forward.
 * @deprecated This feature is now available in the es-hangul package.
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
 * This method has been moved to the es-hangul library.
 * Please use es-hangul for this functionality going forward.
 * @deprecated This feature is now available in the es-hangul package.
 */
export function disassembleHangul(str: string) {
  return disassembleHangulToGroups(str).reduce((hanguls, disassembleds) => `${hanguls}${disassembleds.join('')}`, '');
}
