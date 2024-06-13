import BigNumber from 'bn.js';
import { concat, getKeySize, i2osp, os2ip, random, rsaep } from './utils';

/** @tossdocs-ignore */
export function pkcsEncrypt(n: BigNumber, e: BigNumber, message: string | Uint8Array) {
  const keySize = getKeySize(n);
  const byteMessage = typeof message === 'string' ? new TextEncoder().encode(message) : message;

  /**
   * 변수명 유추가 어려워서 아래에 원본 코드에 맞게 남겨둡니다
   * @see https://github.com/invisal/god_crypto/blob/25ec83d77c73a5eec1f763fbc660a9442ce0b65e/src/rsa/rsa_internal.ts#L73
   */
  const p = concat([0x00, 0x02], random(keySize - byteMessage.length - 3), [0x00], byteMessage);
  const msg = os2ip(p);
  const c = rsaep(n, e, msg);

  return i2osp(c, keySize);
}
