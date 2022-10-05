/**
 * @name byteToHex
 * @description
 * 암호화된 이진 데이터를 문자열로 바꿉니다.
 * ```typescript
 * byteToHex(
 *   // 문자열로 바꿀 이진 데이터
 *   encrypted: Uint8Array
 * ): string
 *
 * @example
 * import BigNumber from 'bn.js';
 * import { byteToHex, pcksEncrypt as encrypt } from `@tossteam/crypto`;
 * const encrypted = encrypt(
 *   new BigNumber(n, 'hex'),
 *   new BigNumber(e, 16),
 *   message,
 * );
 *
 * const encryptMessage = byteToHex(encrypted);
 */
export function byteToHex(encrypted: Uint8Array) {
  return Array.from(encrypted)
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}
