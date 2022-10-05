// 은행 대표코드
/**
 * @name bankCodes
 * @description
 * 각 은행의 은행 코드를 반환합니다.
 *
 * @example
 * const 토스뱅크BankCode = bankCodes['토스뱅크']; // '92'
 */
export const bankCodes = {
  // 은행
  한국은행: 1,
  KDB산업: 2,
  IBK기업: 3,
  KB국민: 4,
  외환: 5,
  수협: 7,
  NH농협: 11,
  지역농축협: 12,
  우리: 20,
  SC제일: 23,
  씨티: 27,
  대구: 31,
  부산: 32,
  광주: 34,
  제주: 35,
  전북: 37,
  경남: 39,
  새마을: 45,
  신협: 48,
  SB저축: 50,
  모간스탠리은행: 52,
  HSBC은행: 54,
  도이치: 55,
  제이피모간체이스: 57,
  미즈호: 58,
  엠유에프지: 59,
  BOA: 60,
  비엔피파리바: 61,
  중국공상: 62,
  중국은행: 63,
  산림조합중앙: 64,
  중국건설: 67,
  우체국: 71,
  신용보증기금: 76,
  기술보증기금: 77,
  하나: 81,
  신한: 88,
  케이뱅크: 89,
  카카오뱅크: 90,
  토스뱅크: 92,
  한국주택금융공사: 93,
  서울보증보험: 94,

  // 저축
  SBI저축: 103,
} as const;

/**
 * @name investmentCompanyCodes
 * 금융투자회사 은행 코드를 반환합니다.
 * @example
 * const 유안타BankCode = investmentCompanyCodes['유안타']; // '209'
 */
export const investmentCompanyCodes = {
  // 증권
  유안타: 209,
  KB: 218,
  상상인: 221,
  한양: 222,
  리딩투자: 223,
  BNK투자: 224,
  IBK투자: 225,
  /** @deprecated 다올투자를 사용하세요 */
  KTB투자: 227,
  다올투자: 227,
  미래에셋: 238,
  삼성: 240,
  한국투자: 243,
  NH투자: 247,
  교보: 261,
  하이투자: 262,
  현대차: 263,
  키움: 264,
  이베스트투자: 265,
  SK: 266,
  대신: 267,
  한화투자: 269,
  /** @deprecated 하나증권을 사용하세요 */
  하나금융투자: 270,
  하나증권: 270,
  토스증권: 271,
  신한금융투자: 278,
  DB증권: 279,
  유진투자: 280,
  메리츠종금: 287,
  카카오페이증권: 288,
  부국: 290,
  신영: 291,
  케이프투자: 292,
  한국증권금융: 293,
  한국포스증권: 294,
  우리종금: 295,
  아주캐피탈: 299,
} as const;

/**
 * @name cardCompanyCodes
 * 카드사 대표코드를 반환합니다.
 * @example
 * const 신한카드BankCode = cardCompanyCodes['신한카드']; // '366'
 */
export const cardCompanyCodes = {
  BC카드: 361,
  광주카드: 364,
  삼성카드: 365,
  신한카드: 366,
  현대카드: 367,
  롯데카드: 368,
  수협카드: 369,
  씨티카드: 370,
  농협카드: 371,
  전북카드: 372,
  제주카드: 373,
  하나카드: 374,
  국민카드: 381,
};

/**
 * @name financialInstitutionCodes
 * @description
 * 금융기관의 코드를 반환합니다.
 * @example
 * const 신한은행Code = financialInstitutionCodes['신한은행']; // '88'
 * const 신한금융투자Code = financialInstitutionCodes['신한금융투자']; // '278'
 * const 신한카드Code = financialInstitutionCodes['신한카드']; // '366'
 */
export const financialInstitutionCodes = { ...bankCodes, ...investmentCompanyCodes, ...cardCompanyCodes };

type CodeOf<T> = T extends { [key: string]: infer Code } ? Code : never;

/**
 * @name BankCode
 * @description
 * 은행 코드들의 Union Type 입니다.
 */
export type BankCode = CodeOf<typeof bankCodes>;
/**
 * @name InvestmentCompanyCode
 * @description
 * 금융투자회사 코드들의 Union Type 입니다.
 */
export type InvestmentCompanyCode = CodeOf<typeof investmentCompanyCodes>;
/**
 * @name CardCompanyCode
 * @description
 * 카드사 코드들의 Union Type 입니다.
 */
export type CardCompanyCode = CodeOf<typeof cardCompanyCodes>;

/**
 * @name FinancialInstitutionCode
 * @description
 * 금융기관 코드들의 Union Type 입니다.
 */
export type FinancialInstitutionCode = BankCode | InvestmentCompanyCode | CardCompanyCode;

/**
 * @name financialInstitutionShortNames
 * @description
 * 금융기관 코드를 기반으로 금융기관의 짧은 이름을 반환합니다.
 * @example
 * const 신한은행ShortName = financialInstitutionShortNames['88']; // '신한'
 */
export const financialInstitutionShortNames: Readonly<Record<FinancialInstitutionCode, string>> = {
  1: '한국은행',
  2: 'KDB산업',
  3: 'IBK기업',
  4: 'KB국민',
  5: '외환',
  7: '수협',
  11: 'NH농협',
  12: '지역농축협',
  20: '우리',
  23: 'SC제일',
  27: '씨티',
  31: '대구',
  32: '부산',
  34: '광주',
  35: '제주',
  37: '전북',
  39: '경남',
  45: '새마을',
  48: '신협',
  50: '저축은행',
  52: '모간스탠리은행',
  54: 'HSBC',
  55: '도이치',
  57: 'JP모간',
  58: '미즈호',
  59: '엠유에프지',
  60: 'BOA',
  61: 'BNP파리바',
  62: '중국공상',
  63: '중국은행',
  64: '산림조합',
  67: '중국건설',
  71: '우체국',
  76: '신용보증기금',
  77: '기술보증기금',
  81: '하나',
  88: '신한',
  89: '케이뱅크',
  90: '카카오뱅크',
  92: '토스뱅크',
  93: '한국주택금융공사',
  94: '서울보증보험',
  103: 'SBI저축',
  209: '유안타',
  218: 'KB증권',
  221: '상상인',
  222: '한양',
  223: '리딩투자',
  224: 'BNK투자',
  225: 'IBK투자',
  227: '다올투자',
  238: '미래에셋',
  240: '삼성',
  243: '한국투자',
  247: 'NH투자',
  261: '교보',
  262: '하이투자',
  263: '현대차',
  264: '키움',
  265: '이베스트',
  266: 'SK',
  267: '대신',
  269: '한화투자',
  270: '하나증권',
  271: '토스증권',
  278: '신한금융투자',
  279: 'DB금융투자',
  280: '유진투자',
  287: '메리츠',
  288: '카카오페이증권',
  290: '부국',
  291: '신영',
  292: '케이프투자',
  293: '한국증권금융',
  294: '한국포스증권',
  295: '우리종금',
  299: '아주캐피탈',
  361: 'BC카드',
  364: '광주카드',
  365: '삼성카드',
  366: '신한카드',
  367: '현대카드',
  368: '롯데카드',
  369: '수협카드',
  370: '씨티카드',
  371: '농협카드',
  372: '전북카드',
  373: '제주카드',
  374: '하나카드',
  381: '국민카드',
};

/**
 * @name financialInstitutionFullNames
 * @description
 * 금융기관 코드를 기반으로 금융기관의 긴 이름을 반환합니다.
 * @example
 * const 신한은행ShortName = financialInstitutionFullNames['88']; // '신한'
 */
export const financialInstitutionFullNames: Readonly<Record<FinancialInstitutionCode, string>> = {
  1: '한국은행',
  2: 'KDB산업은행',
  3: 'IBK기업은행',
  4: 'KB국민은행',
  5: '외환은행',
  7: '수협은행',
  11: 'NH농협은행',
  12: '지역농축협',
  20: '우리은행',
  23: 'SC제일은행',
  27: '씨티은행',
  31: '대구은행',
  32: '부산은행',
  34: '광주은행',
  35: '제주은행',
  37: '전북은행',
  39: '경남은행',
  45: '새마을금고',
  48: '신협중앙회',
  50: '저축은행중앙회',
  52: '모간스탠리은행',
  54: 'HSBC은행',
  55: '도이치은행',
  57: 'JP모간체이스은행',
  58: '미즈호은행',
  59: '엠유에프지은행',
  60: 'BOA',
  61: 'BNP파리바은행',
  62: '중국공상은행',
  63: '중국은행',
  64: '산림조합중앙회',
  67: '중국건설은행',
  71: '우체국',
  76: '신용보증기금',
  77: '기술보증기금',
  81: '하나은행',
  88: '신한은행',
  89: '케이뱅크',
  90: '카카오뱅크',
  92: '토스뱅크',
  93: '한국주택금융공사',
  94: '서울보증보험',
  103: 'SBI저축',
  209: '유안타증권',
  218: 'KB증권',
  221: '상상인증권',
  222: '한양증권',
  223: '리딩투자증권',
  224: 'BNK투자증권',
  225: 'IBK투자증권',
  227: '다올투자증권',
  238: '미래에셋대우',
  240: '삼성증권',
  243: '한국투자증권',
  247: 'NH투자증권',
  261: '교보증권',
  262: '하이투자증권',
  263: '현대차증권',
  264: '키움증권',
  265: '이베스트투자증권',
  266: 'SK증권',
  267: '대신증권',
  269: '한화투자증권',
  270: '하나증권',
  271: '토스증권',
  278: '신한금융투자',
  279: 'DB금융투자',
  280: '유진투자증권',
  287: '메리츠증권',
  288: '카카오페이증권',
  290: '부국증권',
  291: '신영증권',
  292: '케이프투자증권',
  293: '한국증권금융',
  294: '한국포스증권',
  295: '우리종금',
  299: '아주캐피탈',
  361: 'BC카드',
  364: '광주카드',
  365: '삼성카드',
  366: '신한카드',
  367: '현대카드',
  368: '롯데카드',
  369: '수협카드',
  370: '씨티카드',
  371: '농협카드',
  372: '전북카드',
  373: '제주카드',
  374: '하나카드',
  381: '국민카드',
};

const financialInstitutionCodeList: FinancialInstitutionCode[] = [
  ...Object.values(bankCodes),
  ...Object.values(investmentCompanyCodes),
];

/**
 * @name isFinancialInstitutionCode
 * @description
 * 인자로 주어진 숫자가 금융기관의 코드인지 반환합니다.
 * ```typescript
 * isFinancialInstitutionCode(
 *   // 금융기관 코드인지 검사할 숫자
 *   code: number
 * // 금융기관 코드
 * ): FinancialInstitutionCode
 * ```
 * @example
 * isFinancialInstitutionCode(1) // 1은 한국은행, true
 * isFinancialInstitutionCode(2) // 2는 KDB산업은행, true
 * isFinancialInstitutionCode(30000) // false
 */
export function isFinancialInstitutionCode(code: number): code is FinancialInstitutionCode {
  return financialInstitutionCodeList.some(x => x === code);
}

/**
 * @name normalizeFinancialInstitutionCode
 * @description
 * 금융기관 코드 중 중복되는 것을 하나로 합칩니다.
 * ```typescript
 * normalizeFinancialInstitutionCode(
 *  // 금융기관 코드
 *  code: number
 * ): FinancialInstitutionCode
 * ```
 * @example
 * normalizeFinancialInstitutionCode(21) // 21은 구 신한, 현재 신한은행 코드인 88을 반환
 * normalizeFinancialInstitutionCode(26) // 26은 구 신한, 현재 신한은행 코드인 88을 반환
 * normalizeFinancialInstitutionCode(25) // 25은 구 하나, 현재 하나은행 코드인 81을 반환
 */
export function normalizeFinancialInstitutionCode(code: number) {
  if (isFinancialInstitutionCode(code)) {
    return code;
  }

  switch (code) {
    case 13:
    case 14:
    case 15:
    case 17:
    case 18: {
      return bankCodes.지역농축협;
    }
    case 21:
    case 26: {
      return bankCodes.신한;
    }
    case 22:
    case 24: {
      return bankCodes.우리;
    }
    case 44: {
      return bankCodes.외환;
    }
    case 46: {
      return bankCodes.새마을;
    }
    case 25: {
      return bankCodes.하나;
    }
    case 6:
    case 19:
    case 79: {
      return bankCodes.KB국민;
    }
    case 226: {
      return investmentCompanyCodes.KB;
    }
    case 230: {
      return investmentCompanyCodes.미래에셋;
    }
    case 268: {
      return investmentCompanyCodes.메리츠종금;
    }
    default: {
      throw new Error(`'${code}'는 올바르지 않은 은행 코드입니다.`);
    }
  }
}
