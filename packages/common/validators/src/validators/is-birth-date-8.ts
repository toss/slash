/** @tossdocs-ignore */
export function isBirthDate8(birthDate: string) {
  const re = /^([12][0-9]{3})(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;

  return re.test(birthDate);
}
