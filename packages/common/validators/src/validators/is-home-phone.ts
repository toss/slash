/** @tossdocs-ignore */
export function isHomePhone(value: string) {
  return /^0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4])[ -]?\d{3,4}[ -]?\d{4}$/.test(value);
}
