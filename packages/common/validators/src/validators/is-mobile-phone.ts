export function isMobilePhone(phone: string) {
  const re = /^((\+?82)[ -]?)?0?1([0|1|6|7|8|9]{1})[ -]?\d{3,4}[ -]?\d{4}$/;
  return re.test(phone);
}
