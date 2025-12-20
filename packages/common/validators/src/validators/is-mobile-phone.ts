/** @tossdocs-ignore */
export function isMobilePhone(phone: string) {
  const re = /^(?:\+?82[-\s]?0?|0)1(?:0[-\s]?\d{4}[-\s]?\d{4}|[16789][-\s]?\d{3}[-\s]?\d{4})$/;
  return re.test(phone);
}
