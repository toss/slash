import BigNumber from 'bn.js';
import { random, concat, os2ip, rsaep, i2osp, getKeySize } from './utils';

/**
 * @name pkcsEncrypt
 * @description
 * RSA PKCSV1 으로 encrypt 하는 함수, IE를 지원해야할 경우 Polyfill이 필요할 수 있다.
 * - https://tools.ietf.org/html/rfc8017#section-7.2.1
 *
 * ```ts
 * pkcsEncrypt(
 *   // 퍼블릭 키
 *   n: BigNumber,
 *   // 비밀 키
 *   e: BigNumber,
 *   // 암호화할 문자열 또는 이진 데이터
 *   message: string | Uint8Array
 * // 암호화 결과 (이진 데이터, byteToHex 함수로 문자열로 바꾸세요)
 * ): Uint8Array
 * ```
 *
 * @example
 * import BigNumber from 'bn.js';
 * import { byteToHex, pcksEncrypt as encrypt } from `@tossteam/crypto`;
 * const encrypted = encrypt(
 *   new BigNumber(n, 'hex'),
 *   new BigNumber(e, 16),
 *   message,
 * );
 * const encryptMessage = byteToHex(encrypted);
 */
export function pkcsEncrypt(n: BigNumber, e: BigNumber, message: string | Uint8Array) {
  const keySize = getKeySize(n);
  const byteMessage = typeof message === 'string' ? new TextEncoder().encode(message) : message;

  // 변수명 유추가 어려워서 원본 코드에 맞게 남겨둡니다
  // reference: https://github.com/invisal/god_crypto/blob/25ec83d77c73a5eec1f763fbc660a9442ce0b65e/src/rsa/rsa_internal.ts#L73
  const p = concat([0x00, 0x02], random(keySize - byteMessage.length - 3), [0x00], byteMessage);
  const msg = os2ip(p);
  const c = rsaep(n, e, msg);

  return i2osp(c, keySize);
}
