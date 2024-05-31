/** @tossdocs-ignore */
import {
  COMPLETE_HANGUL_END_CHARCODE,
  COMPLETE_HANGUL_START_CHARCODE,
  HANGUL_CHARACTERS_BY_FIRST_INDEX,
  HANGUL_CHARACTERS_BY_LAST_INDEX,
  HANGUL_CHARACTERS_BY_MIDDLE_INDEX,
  NUMBER_OF_JONGSUNG,
  NUMBER_OF_JUNGSUNG,
} from './constants';

export function disassembleCompleteHangulCharacter(
  letter: string
): { first: string; middle: string; last: string } | undefined {
  const charCode = letter.charCodeAt(0);

  const isCompleteHangul = COMPLETE_HANGUL_START_CHARCODE <= charCode && charCode <= COMPLETE_HANGUL_END_CHARCODE;

  if (!isCompleteHangul) {
    return undefined;
  }

  const hangulCode = charCode - COMPLETE_HANGUL_START_CHARCODE;

  const lastIndex = hangulCode % NUMBER_OF_JONGSUNG;
  const middleIndex = ((hangulCode - lastIndex) / NUMBER_OF_JONGSUNG) % NUMBER_OF_JUNGSUNG;
  const firstIndex = Math.floor((hangulCode - lastIndex) / NUMBER_OF_JONGSUNG / NUMBER_OF_JUNGSUNG);

  return {
    first: HANGUL_CHARACTERS_BY_FIRST_INDEX[firstIndex] ?? '',
    middle: HANGUL_CHARACTERS_BY_MIDDLE_INDEX[middleIndex] ?? '',
    last: HANGUL_CHARACTERS_BY_LAST_INDEX[lastIndex] ?? '',
  };
}
