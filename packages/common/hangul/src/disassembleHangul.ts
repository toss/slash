/** @tossdocs-ignore */
import { disassembleHangulToGroups } from './disassembleHangulToGroups';

export function disassembleHangul(str: string) {
  return disassembleHangulToGroups(str).reduce((hanguls, disassembleds) => `${hanguls}${disassembleds.join('')}`, '');
}
