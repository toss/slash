/** @tossdocs-ignore */
import { disassembleHangul } from './disassembleHangul';

export function hangulIncludes(x: string, y: string) {
  const disassembledX = disassembleHangul(x);
  const disassembledY = disassembleHangul(y);

  return disassembledX.includes(disassembledY);
}
