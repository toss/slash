function maskAll(str: string) {
  return str.replace(/./g, '*');
}

function isKoreanName(name: string) {
  return /[가-힣]{2,}/.test(name);
}

function maskName(name: string) {
  if (isKoreanName(name)) {
    switch (name.length) {
      case 2:
        return name.replace(/([가-힣])([가-힣]+)/, '$1*');
      default:
        return maskExceptForEdge(name, 1);
    }
  } else {
    if (name.length < 3) {
      return name;
    }

    const unmaskedSideSize = name.length < 6 ? 1 : 2;
    return maskExceptForEdge(name, unmaskedSideSize);
  }
}

/**
 * 앞뒤로 N자만큼 노출하고 그 외에는 *로 변경합니다. 띄어쓰기는 무시합니다.
 * mask('hello', 1) -> h***o
 * mask('hello world', 2) -> he*** ***ld
 */
function maskExceptForEdge(text: string, edgeSize: number) {
  return (
    text.slice(0, edgeSize) +
    text.slice(edgeSize, text.length - edgeSize).replace(/[a-zA-Z가-힇]/g, '*') +
    text.slice(text.length - edgeSize, text.length)
  );
}

function isHyphenSeparated(phoneNumber: string) {
  return /^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber);
}

function isSeoulPhoneNumber(phoneNumber: string) {
  return /^02\d+$/.test(phoneNumber);
}

function maskPhoneNumber(phoneNumber: string) {
  if (isHyphenSeparated(phoneNumber)) {
    return phoneNumber.replace(/^(\d{2,3})-(\d{3,4})-(\d{4})$/, (_, p1, p2, p3) => `${p1}-${maskAll(p2)}-${p3}`);
  }
  if (isSeoulPhoneNumber(phoneNumber)) {
    return phoneNumber.replace(/^02(\d{3,4})(\d{4})/, (_, p1, p2) => `02${maskAll(p1)}${p2}`);
  }
  return phoneNumber.replace(/^(\d{3})(\d{3,4})(\d{4})/, (_, p1, p2, p3) => `${p1}${maskAll(p2)}${p3}`);
}

export const Masker = {
  /**
   * @name Masker.maskName
   * @description 개인정보보호위원회, KISA 기준으로 고객의 이름을 마스킹하는 유틸리티입니다.
   * @example
   * Masker.maskName('강찬규'); // 강*규
   * Masker.maskName('TossFrontendLibraries'); // To*****************es
   * @see https://docs.google.com/spreadsheets/d/1FmlykxVhSUD1pqw25FMeltAvhT_rFcBb/edit#gid=890278753
   */
  maskName,

  /**
   * @name Masker.maskPhoneNumber
   * @description 개인정보보호위원회, KISA 기준으로 고객의 핸드폰번호를 마스킹하는 유틸리티입니다.
   * @example
   * Masker.maskPhoneNumber('010-1234-5678'); // 010-****-5678
   * Masker.maskPhoneNumber('01012345678'); // 010****5678
   * @see https://docs.google.com/spreadsheets/d/1FmlykxVhSUD1pqw25FMeltAvhT_rFcBb/edit#gid=890278753
   */
  maskPhoneNumber,
};
