/** @tossdocs-ignore */
export function byteToHex(encrypted: Uint8Array) {
  return Array.from(encrypted)
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}
