/** @tossdocs-ignore */
import { disassembleHangul } from './disassemble';

/**
 * This method has been moved to the es-hangul library.
 * Please use es-hangul for this functionality going forward.
 * @deprecated This feature is now available in the es-hangul package.
 */
export function hangulIncludes(x: string, y: string) {
  const disassembledX = disassembleHangul(x);
  const disassembledY = disassembleHangul(y);

  return disassembledX.includes(disassembledY);
}
