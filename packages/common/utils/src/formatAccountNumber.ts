import { bankCodes, investmentCompanyCodes } from './financialInstitutionCodes';

interface Pattern {
  length: number;
  pattern: RegExp;
}

const patternsMapping: Record<string, Pattern[]> = {
  [bankCodes.KDB산업]: [
    {
      length: 11,
      pattern: /([0-9]{3})(1[139]|2[02])([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /(01[139]|02[02])([0-9]{4})([0-9]{4})([0-9]{3})/,
    },
    {
      length: 14,
      pattern: /(010)([0-9]{8})([0-9]{3})/,
    },
  ],
  [bankCodes.IBK기업]: [
    {
      length: 10,
      pattern: /([0-9]{8})([0-9]{2})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{8})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(0[1-467]|1[34])([0-9]{6})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{6})(0[1-467]|1[34])([0-9]{3})/,
    },
  ],
  [bankCodes.KB국민]: [
    {
      length: 10,
      pattern: /(0[0-9]{2})([0-9]{3,4})([0-9]{4})/,
    },
    {
      length: 11,
      pattern: /([09][0-9]{10})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(0[145]|2[1456])([0-9]{4})([0-9]{3})/,
    },
    {
      length: 14,
      pattern: /([0-9]{4})(92)([0-9]{7})([0-9])/,
    },
    {
      length: 12,
      pattern: /([0-9]{4})(06|18)([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{4}0[1237]|[0-9]{4}25|[0-9]{4}37|[0-9]{4}90)([0-9]{2})([0-9]{6})/,
    },
  ],
  [bankCodes.수협]: [
    {
      length: 11,
      pattern: /([0-9]{3})(0[12368]|13|6[1237])([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /(10[12368][0-9]|11[34][0-9]|167[0-9]|20[12689][0-9])([0-9]{4})([0-9]{4})/,
    },
    {
      length: 12,
      pattern: /(0)([0-9]{11})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})(40)([0-9]{8})([0-9])/,
    },
  ],
  [bankCodes.NH농협]: [
    {
      length: 11,
      pattern: /([0-9]{3})(0[12456]|1[0247]|2[148]|3[14]|4[35679]|59|79|8[01678])([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{4})(0[12456]|1[0247]|2[148]|3[14]|4[35679]|59|79|8[01678])([0-9]{5})([0-9])/,
    },
    {
      length: 13,
      pattern: /(028|031|04[36]|079|08[1678]|304|31[04]|32[14]|334|34[579]|359|380)([0-9]{4})([0-9]{4})([0-9]1|[0-9]2)/,
    },
    {
      length: 13,
      pattern: /(30[1256]|31[27])([0-9]{4})([0-9]{4})([0-9]{2})/,
    },
    {
      length: 14,
      pattern: /([0-9]{6})(6[45])([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /(79[01])([0-9]{4})([0-9]{4})([0-9]{3})/,
    },
  ],
  [bankCodes.지역농축협]: [
    {
      length: 13,
      pattern: /(028|354|360|384|39[48])([0-9]{4})([0-9]{4})([0-9][345])/,
    },
    {
      length: 13,
      pattern: /(35[1256])([0-9]{4})([0-9]{4})([0-9]{2})/,
    },
    {
      length: 14,
      pattern: /([0-9]{6})(5[1256])([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /([0-9]{6})(6[67])([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /(792)([0-9]{4})([0-9]{4})([0-9]{2})([0-9])/,
    },
    {
      length: 10,
      pattern: /([0-9]{9})([0-9])/,
    },
    {
      length: 13,
      pattern: /([0-9]{12})([0-9])/,
    },
  ],
  [bankCodes.우리]: [
    {
      length: 13,
      pattern: /([0-9]{4})([0-9]{3})([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{6})(18|92)([0-9]{3})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})(0[124-8])([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{6})(0[1-4]|1[235])([0-9]{3})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(0[1459]|2[145])([0-9]{6})([0-9])/,
    },
  ],
  [bankCodes.SC제일]: [
    {
      length: 11,
      pattern: /([0-9]{3})([123]0|15)([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})(16)([0-9]{9})/,
    },
  ],
  [bankCodes.씨티]: [
    {
      length: 13,
      pattern:
        /([0-9]{3})([0-9]{5})(0[13567][0-9]|[15][135][0-9]|2[134-79][0-9]|3[13][0-9]|4[123][0-9]|63[0-9]|[78]1[0-9]|9[129][0-9])([0-9]{2})/,
    },
    {
      length: 12,
      pattern: /([0-9])([0-9]{6})([0-9])(18|2[45]|41)([0-9]{2})/,
    },
    {
      length: 11,
      pattern:
        /([0-9]{3})([0-9]{5})(0[13567][0-9]|[15][135][0-9]|2[13-79][0-9]|3[13][0-9]|4[123][0-9]|63[0-9]|[78]1[0-9]|9[129][0-9])/,
    },
    {
      length: 10,
      pattern: /([05])([0-9]{6})([0-9]{2})([0-9])/,
    },
    {
      length: 10,
      pattern: /([0-9]{2})([0156][0-9]|2[01]|3[02-8]|4[0-68]|[78][013-8]|9[1-69])([0-9]{5})([0-9])/,
    },
  ],
  [bankCodes.대구]: [
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(0[124578])([0-9]{6})([0-9])/,
    },
    {
      length: 12,
      pattern: /(50[12458])([0-9]{2})([0-9]{6})([0-9])/,
    },
    {
      length: 12,
      pattern: /(517)([0-9]{2})([0-9]{6})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})(0[1245678])([0-9]{6})([0-9]{3})/,
    },
  ],
  [bankCodes.부산]: [
    {
      length: 12,
      pattern: /([0-9]{3})(0[1239]|1[123])([0-9]{6})([0-9])/,
    },
    {
      length: 13,
      pattern: /(10[1239]|11[23])([0-9]{4})([0-9]{4})([0-9]{2})/,
    },
  ],
  [bankCodes.광주]: [
    {
      length: 12,
      pattern: /([0-9]{3})(10[13789]|12[1-47]|130|716)([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(731)([0-9]{6})/,
    },
    {
      length: 13,
      pattern: /([0-9]10[1379]|[0-9]12[17]|[0-9]155)([0-9]{3})([0-9]{6})/,
    },
  ],
  [bankCodes.제주]: [
    {
      length: 10,
      pattern: /([0-9]{2})(0[1-5]|13)([0-9]{6})/,
    },
  ],
  [bankCodes.전북]: [
    {
      length: 12,
      pattern: /([0-9]{3})([02][123]|1[1235]|3[567])([0-9]{7})/,
    },
    {
      length: 13,
      pattern: /([0-9]01[123]|[0-9]02[13])([0-9]{2})([0-9]{7})/,
    },
  ],
  [bankCodes.경남]: [
    {
      length: 12,
      pattern: /([0-9]{3})(0[1379]|2[012]|3[25])([0-9]{7})/,
    },
    {
      length: 13,
      pattern: /(20[1379]|22[012]|23[25])([0-9]{9})([0-9])/,
    },
  ],
  [bankCodes.새마을]: [
    {
      length: 13,
      pattern: /([0-9]{4})(09|1[03]|37)([0-9]{6})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{4})(80[1-9]|8[16]0|85[1-9])([0-9]{6})([0-9])/,
    },
    {
      length: 13,
      pattern: /(900[2345]|9072|909[0-3]|9100|920[025789]|921[02])([0-9]{4})([0-9]{4})([0-9])/,
    },
    {
      length: 13,
      pattern: /(8)([0-9]{11})([0-9])/,
    },
  ],
  [bankCodes.신협]: [
    {
      length: 13,
      pattern: /([0-9]{5})(1[23])([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{5})(14)([0-9]{6})([0-9])/,
    },
    {
      length: 10,
      pattern: /([0-9]{3})([0-9]{3})([0-9]{4})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{4})([0-9]{4})/,
    },
    {
      length: 12,
      pattern: /(110|13[1-8]|17[0123478]|731|910)([0-9]{3})([0-9]{6})/,
    },
  ],
  [bankCodes.SB저축]: [
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{2})(13|2[1-3])([0-9]{6})([0-9])/,
    },
  ],
  [bankCodes.SBI저축]: [
    {
      length: 14,
      pattern: /(028[0-9]{2})(13|2[1-3])([0-9]{7})/,
    },
  ],
  [bankCodes.HSBC은행]: [
    {
      length: 12,
      pattern:
        /([0-9]{3})([0-9]{5})([0-9])(0[02][1-9]|0[13]0|06[6-9]|07[236-9]|08[36-9]|22[123]|29[67]|30[67]|407|46[1-5]|70[23]|71[12]|78[34]|863|90[0-3]|98[5-9]|99[0-4])/,
    },
  ],
  [bankCodes.도이치]: [
    {
      length: 10,
      pattern: /([0-9]{10})/,
    },
  ],
  [bankCodes.제이피모간체이스]: [
    {
      length: 10,
      pattern: /([0-9]{10})/,
    },
  ],
  [bankCodes.BOA]: [
    {
      length: 12,
      pattern: /([0-9]{4})([0-9]{5})([0-9]{2})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{4})([0-9]{10})/,
    },
  ],
  [bankCodes.비엔피파리바]: [
    {
      length: 14,
      pattern: /([0-9]{5})([0-9]{6})([0-9]{3})/,
    },
  ],
  [bankCodes.중국공상]: [
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{9})([0-9]{2})/,
    },
  ],
  [bankCodes.산림조합중앙]: [
    {
      length: 13,
      pattern: /([0-9]{5})(2[127]|3[02])([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})(1[1-5])([0-9]{7})/,
    },
  ],
  [bankCodes.우체국]: [
    {
      length: 14,
      pattern: /([0-9]{6})(0[12356]|52)([0-9]{6})/,
    },
  ],
  [bankCodes.외환]: [
    {
      length: 11,
      pattern: /([0-9]{3})(1[1389]|2[26]|3[389])([0-9]{5})([0-9])/,
    },
    {
      length: 12,
      pattern: /(6[0123][01])([0-9]{6})([0-9]{3})/,
    },
  ],
  [bankCodes.하나]: [
    {
      length: 14,
      pattern: /(373)([0-9]{6})([0-9]{5})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{6})([0-9]{3}0[124578]|[0-9]{3}37|[0-9]{3}60|[0-9]{3}94)/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{6})([0-9]{5})/,
    },
  ],
  [bankCodes.신한]: [
    {
      length: 12,
      pattern: /([12][01-5][0-9]|16[01]|26[89]|298)([0-9]{3})([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /(56[012])([0-9]{3})([0-9]{7})([0-9])/,
    },
  ],
  // (구)조흥
  '21': [
    {
      length: 11,
      pattern: /([0-9]{3})(0[1-9]|61)([0-9]{6})/,
    },
    {
      length: 13,
      pattern: /([0-9]{3})(8[12])([0-9]{8})/,
    },
  ],
  // (구)신한
  '26': [
    {
      length: 11,
      pattern: /([0-9]{3})(0[1-5]|1[1-3]|99)([0-9]{5})([0-9])/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})(901)([0-9]{7})([0-9])/,
    },
  ],
  [bankCodes.케이뱅크]: [
    {
      length: 10,
      pattern: /(9)([0-9]{9})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})([0-9]{3})([0-9]{6})/,
    },
    {
      length: 13,
      pattern: /([0-9]{2})([0-9]{3})([0-9]{4})([0-9]{4})/,
    },
    {
      length: 14,
      pattern: /(7[0-9]{2}|9[0-9]{2})([0-9]{4})([0-9]{3})([0-9]{4})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{4})([0-9]{3})([0-9]{4})/,
    },
  ],
  [bankCodes.카카오뱅크]: [
    {
      length: 13,
      pattern: /([0-9]{4})([0-9]{2})([0-9]{7})/,
    },
  ],
  [bankCodes.토스뱅크]: [
    {
      length: 12,
      pattern: /([0-9]{4})([0-9]{4})([0-9]{4})/,
    },
  ],
  [investmentCompanyCodes.유안타]: [
    {
      length: 11,
      pattern: /([0-9]{3})([07][16]|53)([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{4})([0-9]{4})([0-9]{4})/,
    },
  ],
  [investmentCompanyCodes.KB]: [
    {
      length: 11,
      pattern: /([0-9]{3})(0[167]|1[0126]|[345]0|[45]5|6[1-9])([0-9]{6})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/,
    },
    {
      length: 9,
      pattern: /([0-9]{3})([0-9]{3})([0-9]{3})/,
    },
  ],
  [investmentCompanyCodes.미래에셋]: [
    {
      length: 12,
      pattern: /([0-9]{3})([01]5|2[0-3]|3[479]|5[18]|6[023]|9[012])([0-9]{7})/,
    },
    {
      length: 12,
      pattern: /([0-9]{12})/,
    },
  ],
  // 미래에셋대우
  '230': [
    {
      length: 11,
      pattern: /([0-9]{3})(01|31|4[46]|51|77|99)([0-9]{6})/,
    },
    {
      length: 8,
      pattern: /([0-9]{8})/,
    },
    {
      length: 9,
      pattern: /([0-9]{9})/,
    },
    {
      length: 10,
      pattern: /([0-9]{10})/,
    },
    {
      length: 11,
      pattern: /([0-9]{11})/,
    },
    {
      length: 12,
      pattern: /([0-9]{12})/,
    },
    {
      length: 13,
      pattern: /([0-9]{13})/,
    },
    {
      length: 14,
      pattern: /([0-9]{14})/,
    },
  ],
  [investmentCompanyCodes.삼성]: [
    {
      length: 8,
      pattern: /([0-9]{8})/,
    },
    {
      length: 10,
      pattern: /([0-9]{8})([0-9]{2})/,
    },
    {
      length: 12,
      pattern: /([0-9]{10})([0-9]{2})/,
    },
    {
      length: 14,
      pattern: /([0-9])([0-9]{5})([0-9]{8})/,
    },
  ],
  [investmentCompanyCodes.한국투자]: [
    {
      length: 10,
      pattern: /([0-9]{8})([0-9]{2})/,
    },
    {
      length: 12,
      pattern: /([0-9]{8})([0-9]{4})/,
    },
    {
      length: 14,
      pattern: /([0-9]{8})([0-9]{2})([0-9]{4})/,
    },
  ],
  [investmentCompanyCodes.NH투자]: [
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{6})/,
    },
  ],
  [investmentCompanyCodes.교보]: [
    {
      length: 11,
      pattern: /(0[0-9]{2})([07]1|3[15]|5[134]|6[0-9]|80)([0-9]{6})/,
    },
    {
      length: 11,
      pattern: /([1-9][0-9]{3})([0-9]{5})([0-9]{2})/,
    },
  ],
  [investmentCompanyCodes.하이투자]: [
    {
      length: 10,
      pattern: /([0-9]{4})([0-9]{4})(0[1-9]|[1-9][0-9])/,
    },
  ],
  [investmentCompanyCodes.현대차]: [
    {
      length: 8,
      pattern: /([0-9]{8})/,
    },
  ],
  [investmentCompanyCodes.키움]: [
    {
      length: 10,
      pattern: /([0-9]{4})([0-9]{4})([1-46]1|5[0-9]|7[124]|98)/,
    },
    {
      length: 8,
      pattern: /([0-9]{4})([0-9]{4})/,
    },
  ],
  [investmentCompanyCodes.이베스트투자]: [
    {
      length: 11,
      pattern: /([0-9]{3})([01]1|[46]5|5[156]|7[78])([0-9]{6})/,
    },
    {
      length: 9,
      pattern: /([0-9]{9})/,
    },
    {
      length: 11,
      pattern: /([0-9]{11})/,
    },
  ],
  [investmentCompanyCodes.SK]: [
    {
      length: 11,
      pattern: /([0-9]{11})/,
    },
    {
      length: 9,
      pattern: /([0-9]{9})/,
    },
  ],
  [investmentCompanyCodes.대신]: [
    {
      length: 9,
      pattern: /([0-9]{3})([0-9]{6})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{6})([0-9]{2})/,
    },
  ],
  [investmentCompanyCodes.한화투자]: [
    {
      length: 10,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{5})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{6})/,
    },
    {
      length: 13,
      pattern: /([0-9]{13})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})([0-9]{11})/,
    },
  ],
  [investmentCompanyCodes.하나증권]: [
    {
      length: 8,
      pattern: /([0-9]{7})([0-9])/,
    },
    {
      length: 10,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{5})/,
    },
    {
      length: 11,
      pattern: /([0-9]{8})([0-9]{3})/,
    },
    {
      length: 14,
      pattern: /([0-9]{8})([0-9]{3})([0-9]{3})/,
    },
  ],
  [investmentCompanyCodes.신한금융투자]: [
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{6})/,
    },
  ],
  [investmentCompanyCodes.DB증권]: [
    {
      length: 9,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{4})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{4})([0-9]{2})/,
    },
  ],
  [investmentCompanyCodes.유진투자]: [
    {
      length: 11,
      pattern: /([0-9]{11})/,
    },
  ],
  [investmentCompanyCodes.메리츠종금]: [
    {
      length: 10,
      pattern: /([0-9]{4})([0-9]{4})(1[156]|2[123]|[347]1|42|6[1-6]|99)/,
    },
    {
      length: 10,
      pattern: /([0-9]{4})([0-9]{4})([0-9]{2})/,
    },
    {
      length: 11,
      pattern: /([0-9]{3})([02]1|5[34]|88)([0-9]{6})/,
    },
    {
      length: 8,
      pattern: /([0-9]{4})([0-9]{4})/,
    },
  ],
  [investmentCompanyCodes.부국]: [
    {
      length: 11,
      pattern: /([0-9]{3})([01]1|3[013]|46)([0-9]{6})/,
    },
  ],
  [investmentCompanyCodes.신영]: [
    {
      length: 9,
      pattern: /([0-9]{3})([0-9]{6})/,
    },
    {
      length: 12,
      pattern: /([0-9]{3})([0-9]{6})([0-9]{3})/,
    },
  ],
  [investmentCompanyCodes.케이프투자]: [
    {
      length: 11,
      pattern: /([0-9]{3})([01]1|33|55|7[5-8]|88)([0-9]{6})/,
    },
    {
      length: 14,
      pattern: /([0-9]{3})(8[78])([0-9]{6})([0-9]{3})/,
    },
  ],
  [investmentCompanyCodes.한국포스증권]: [
    {
      length: 11,
      pattern: /([0-9]{3})([0-9]{2})([0-9]{6})/,
    },
  ],
};

const patternsForUnknown: Pattern[] = [
  // 휴대폰번호 / 전화번호
  {
    length: 9,
    pattern: /(02)([0-9]{3})([0-9]{4})/,
  },
  {
    length: 10,
    pattern: /(02)([0-9]{4})([0-9]{4})/,
  },
  {
    length: 10,
    pattern: /(0[13-9][0-9])([0-9]{3})([0-9]{4})/,
  },
  {
    length: 11,
    pattern: /(0[13-9][0-9])([0-9]{4})([0-9]{4})/,
  },
  // 8자리(고객지정) + 2자리(00)
  {
    length: 10,
    pattern: /([0-9]{4})([0-9]{4})(00)/,
  },
];

function isAccountNumberMatchesPattern({ length, pattern }: Pattern, accountNumber: string) {
  return accountNumber.length === length && pattern.test(accountNumber);
}

function findPatternByAccountNumber(accountNumber: string) {
  return [...Object.values(patternsMapping), ...patternsForUnknown]
    .flat()
    .find(pattern => isAccountNumberMatchesPattern(pattern, accountNumber));
}

export class InvalidAccountNumberError extends Error {
  constructor() {
    super('유효하지 않은 계좌번호 패턴');
  }
}

/**
 * @name formatAccountNumber
 * @description
 * 계좌번호를 금융기관 표기법에 따라서 포맷팅을 합니다.
 *
 * "bankCode" 값이 없다면 "accountNumber" 길이와 같은 길이의 패턴에서 선택합니다.
 *
 * @throws {InvalidAccountNumberError}
 *
 * @example
 * const formatted = formatAccountNumber('123412341234', bankCodes.토스뱅크);
 * console.log(formatted); // '1234-1234-1234'
 *
 * @see https://www.cmsedi.or.kr/cms/board/workdata/view/926 참가기관별 CMS 계좌번호체계는 아래를 참고해주세요. (기준일 : 2019. 12. 20)
 * @see https://github.toss.bz/toss/toss-ios/blob/develop/Modules/TossFoundation/TossFoundation/Helper/AccountNumber/AccountNumberParser.swift iOS 구현코드를 참조하였습니다.
 */
export function formatAccountNumber(accountNumber: string, bankCode?: number) {
  const patterns = bankCode != null ? patternsMapping[bankCode] : undefined;
  const pattern =
    patterns?.find(pattern => isAccountNumberMatchesPattern(pattern, accountNumber)) ??
    findPatternByAccountNumber(accountNumber);

  if (pattern == null) {
    throw new InvalidAccountNumberError();
  }

  const matchResult = accountNumber.match(pattern.pattern);
  if (matchResult == null) {
    throw new InvalidAccountNumberError();
  }

  const [, ...splits] = matchResult;

  return splits.join('-');
}
