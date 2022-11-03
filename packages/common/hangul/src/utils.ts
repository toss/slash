/** @tossdocs-ignore */
import { disassembleCompleteHangulCharacter } from './disassembleCompleteHangulCharacter';
import { disassembleHangulToGroups } from './disassembleHangulToGroups';

export function hasBatchim(str: string) {
  const lastChar = str[str.length - 1]!;
  const disassembled = disassembleCompleteHangulCharacter(lastChar);
  return disassembled != null && disassembled.last !== '';
}

export function getFirstConsonants(word: string) {
  return disassembleHangulToGroups(word).reduce((firstConsonants, [consonant]) => {
    return `${firstConsonants}${consonant}`;
  }, '');
}
