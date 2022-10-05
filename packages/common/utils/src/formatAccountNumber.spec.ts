import {
  bankCodes,
  FinancialInstitutionCode,
  financialInstitutionShortNames,
  investmentCompanyCodes,
} from './financialInstitutionCodes';
import { formatAccountNumber, InvalidAccountNumberError } from './formatAccountNumber';

const testCases: Array<{
  bankCode: number;
  cases: Array<{ accountNumber: string; formatted: string }>;
}> = [
  {
    bankCode: bankCodes.KDB산업,
    cases: [{ accountNumber: '02292001496312', formatted: '022-9200-1496-312' }],
  },
  {
    bankCode: bankCodes.IBK기업,
    cases: [
      { accountNumber: '19208990101011', formatted: '192-089901-01-011' },
      { accountNumber: '27406048114001', formatted: '274-060481-14-001' },
      { accountNumber: '08203397304012', formatted: '082-033973-04-012' },
    ],
  },
  {
    bankCode: bankCodes.KB국민,
    cases: [
      { accountNumber: '009011259768', formatted: '009-01-1259-768' },
      { accountNumber: '432241234567', formatted: '432-24-1234-567' },
      { accountNumber: '067010511175', formatted: '067-01-0511-175' },
      { accountNumber: '93350200334869', formatted: '933502-00-334869' },
      { accountNumber: '44730101107106', formatted: '447301-01-107106' },
      { accountNumber: '12340256789012', formatted: '123402-56-789012' },
      { accountNumber: '43210709876543', formatted: '432107-09-876543' },
      { accountNumber: '07589073110213', formatted: '075890-73-110213' },
      { accountNumber: '75600303110213', formatted: '756003-03-110213' },
    ],
  },
  {
    bankCode: bankCodes.수협,
    cases: [
      { accountNumber: '43161012662', formatted: '431-61-012662' },
      { accountNumber: '101018311304', formatted: '1010-1831-1304' },
      { accountNumber: '101018311319', formatted: '1010-1831-1319' },
      { accountNumber: '206000565992', formatted: '2060-0056-5992' },
    ],
  },
  {
    bankCode: bankCodes.NH농협,
    cases: [
      { accountNumber: '21701956105804', formatted: '217019-56-105804' },
      { accountNumber: '36717000116', formatted: '367-17-000116' },
      { accountNumber: '08301266417', formatted: '083-01-266417' },
      { accountNumber: '09802359882', formatted: '098-02-359882' },
      { accountNumber: '3014412351211', formatted: '301-4412-3512-11' },
      { accountNumber: '3510305801273', formatted: '351-0305-8012-73' },
      { accountNumber: '79017749804114', formatted: '790-1774-9804-114' },
      { accountNumber: '79017028593364', formatted: '790-1702-8593-364' },
    ],
  },
  {
    bankCode: bankCodes.우리,
    cases: [
      { accountNumber: '12504100601', formatted: '125-04-100601' },
      { accountNumber: '14005032281', formatted: '140-05-032281' },
      { accountNumber: '1002248155340', formatted: '1002-248-155340' },
      { accountNumber: '1002054497061', formatted: '1002-054-497061' },
      { accountNumber: '1073111319448', formatted: '1073-111-319448' },
      { accountNumber: '1203901632242', formatted: '1203-901-632242' },
      { accountNumber: '1320123654321', formatted: '1320-123-654321' },
      { accountNumber: '10317978501102', formatted: '103-179785-01-102' },
      { accountNumber: '10323782913602', formatted: '103-237829-13-602' },
      { accountNumber: '62395145418028', formatted: '623-951454-18-028' },
    ],
  },
  {
    bankCode: bankCodes.SC제일,
    cases: [
      { accountNumber: '35710013663', formatted: '357-10-013663' },
      { accountNumber: '43220012345', formatted: '432-20-012345' },
    ],
  },
  {
    bankCode: bankCodes.씨티,
    cases: [
      { accountNumber: '72000155242', formatted: '720-00155-242' },
      { accountNumber: '11051095247', formatted: '110-51095-247' },
      { accountNumber: '3340647792104', formatted: '334-06477-921-04' },
    ],
  },
  {
    bankCode: bankCodes.대구,
    cases: [
      { accountNumber: '04010002733', formatted: '040-10-002733' },
      { accountNumber: '010040003667', formatted: '010-04-000366-7' },
      { accountNumber: '517101072632', formatted: '517-10-107263-2' },
      { accountNumber: '04104291871001', formatted: '041-04-291871-001' },
    ],
  },
  {
    bankCode: bankCodes.부산,
    cases: [
      { accountNumber: '1012011578304', formatted: '101-2011-5783-04' },
      { accountNumber: '1122113802009', formatted: '112-2113-8020-09' },
      { accountNumber: '121130020866', formatted: '121-13-002086-6' },
    ],
  },
  {
    bankCode: bankCodes.광주,
    cases: [
      { accountNumber: '630122231488', formatted: '630-122-231488' },
      { accountNumber: '625107309199', formatted: '625-107-309199' },
      { accountNumber: '050130224857', formatted: '050-130-224857' },
      { accountNumber: '053130231463', formatted: '053-130-231463' },
      { accountNumber: '1155020122726', formatted: '1155-020-122726' },
      { accountNumber: '1155020123664', formatted: '1155-020-123664' },
    ],
  },
  { bankCode: bankCodes.제주, cases: [{ accountNumber: '0102737094', formatted: '01-02-737094' }] },
  {
    bankCode: bankCodes.전북,
    cases: [{ accountNumber: '1021014344601', formatted: '1021-01-4344601' }],
  },
  {
    bankCode: bankCodes.경남,
    cases: [
      { accountNumber: '540210154312', formatted: '540-21-0154312' },
      { accountNumber: '648220085589', formatted: '648-22-0085589' },
    ],
  },
  {
    bankCode: bankCodes.새마을,
    cases: [
      { accountNumber: '3902090178270', formatted: '3902-09-017827-0' },
      { accountNumber: '2823090082542', formatted: '2823-09-008254-2' },
      { accountNumber: '9002190080731', formatted: '9002-1900-8073-1' },
      { accountNumber: '9003229870762', formatted: '9003-2298-7076-2' },
      { accountNumber: '9100890004898', formatted: '9100-8900-0489-8' },
    ],
  },
  {
    bankCode: bankCodes.신협,
    cases: [
      { accountNumber: '132098989897', formatted: '132-098-989897' },
      { accountNumber: '131005631005', formatted: '131-005-631005' },
    ],
  },
  {
    bankCode: bankCodes.SBI저축,
    cases: [{ accountNumber: '02810136081731', formatted: '02810-13-6081731' }],
  },
  {
    bankCode: bankCodes.산림조합중앙,
    cases: [
      { accountNumber: '102150000745', formatted: '102-15-0000745' },
      { accountNumber: '602110011087', formatted: '602-11-0011087' },
    ],
  },
  {
    bankCode: bankCodes.우체국,
    cases: [{ accountNumber: '01424101012897', formatted: '014241-01-012897' }],
  },
  {
    bankCode: bankCodes.하나,
    cases: [
      { accountNumber: '06122019495', formatted: '061-22-01949-5' },
      { accountNumber: '15413006047', formatted: '154-13-00604-7' },
      { accountNumber: '10636392900104', formatted: '106-363929-00104' },
      { accountNumber: '27281004706905', formatted: '272-810047-06905' },
      { accountNumber: '37391114326321', formatted: '373-911143-26321' },
    ],
  },
  {
    bankCode: bankCodes.외환,
    cases: [{ accountNumber: '630006198804', formatted: '630-006198-804' }],
  },
  {
    bankCode: bankCodes.신한,
    cases: [
      { accountNumber: '210068114762', formatted: '210-068-114762' },
      { accountNumber: '110068114762', formatted: '110-068-114762' },
      { accountNumber: '140009199178', formatted: '140-009-199178' },
    ],
  },
  {
    bankCode: 21,
    cases: [
      { accountNumber: '25301002133', formatted: '253-01-002133' },
      { accountNumber: '29605004545', formatted: '296-05-004545' },
    ],
  },
  {
    bankCode: bankCodes.케이뱅크,
    cases: [{ accountNumber: '100100123456', formatted: '100-100-123456' }],
  },
  {
    bankCode: bankCodes.카카오뱅크,
    cases: [
      { accountNumber: '3333040667632', formatted: '3333-04-0667632' },
      { accountNumber: '3310019742091', formatted: '3310-01-9742091' },
    ],
  },
  {
    bankCode: bankCodes.토스뱅크,
    cases: [
      { accountNumber: '123412341234', formatted: '1234-1234-1234' },
      { accountNumber: '100030340676', formatted: '1000-3034-0676' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.유안타,
    cases: [
      { accountNumber: '07901116237', formatted: '079-01-116237' },
      { accountNumber: '363271110134', formatted: '3632-7111-0134' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.KB,
    cases: [
      { accountNumber: '254529933', formatted: '254-529-933' },
      { accountNumber: '251911167', formatted: '251-911-167' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.미래에셋,
    cases: [{ accountNumber: '210229677732', formatted: '210-22-9677732' }],
  },
  {
    bankCode: 230,
    cases: [{ accountNumber: '01299123456', formatted: '012-99-123456' }],
  },
  {
    bankCode: investmentCompanyCodes.삼성,
    cases: [
      { accountNumber: '707707753401', formatted: '7077077534-01' },
      { accountNumber: '707907562301', formatted: '7079075623-01' },
      { accountNumber: '4054798850', formatted: '40547988-50' },
      { accountNumber: '45944626', formatted: '45944626' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.한국투자,
    cases: [
      { accountNumber: '6831877401', formatted: '68318774-01' },
      { accountNumber: '7173489521', formatted: '71734895-21' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.NH투자,
    cases: [
      { accountNumber: '20202280635', formatted: '202-02-280635' },
      { accountNumber: '00782932600', formatted: '007-82-932600' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.교보,
    cases: [
      { accountNumber: '00180300368', formatted: '001-80-300368' },
      { accountNumber: '10042282001', formatted: '1004-22820-01' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.하이투자,
    cases: [{ accountNumber: '2014410505', formatted: '2014-4105-05' }],
  },
  {
    bankCode: investmentCompanyCodes.대신,
    cases: [
      { accountNumber: '14012122801', formatted: '140-121228-01' },
      { accountNumber: '61410445310', formatted: '614-104453-10' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.한화투자,
    cases: [
      { accountNumber: '5018212345', formatted: '501-82-12345' },
      { accountNumber: '50016052311', formatted: '500-16-052311' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.하나증권,
    cases: [
      { accountNumber: '12345678111', formatted: '12345678-111' },
      { accountNumber: '1058509069', formatted: '105-85-09069' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.신한금융투자,
    cases: [
      { accountNumber: '00111466769', formatted: '001-11-466769' },
      { accountNumber: '21011123456', formatted: '210-11-123456' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.DB증권,
    cases: [{ accountNumber: '101570917', formatted: '101-57-0917' }],
  },
  {
    bankCode: investmentCompanyCodes.메리츠종금,
    cases: [
      { accountNumber: '22252547', formatted: '2225-2547' },
      { accountNumber: '22337461', formatted: '2233-7461' },
      { accountNumber: '2225254716', formatted: '2225-2547-16' },
    ],
  },
  {
    bankCode: investmentCompanyCodes.신영,
    cases: [
      { accountNumber: '110093033', formatted: '110-093033' },
      { accountNumber: '100093033001', formatted: '100-093033-001' },
    ],
  },
];

describe('formatAccountNumber', () => {
  testCases.forEach(({ bankCode, cases }) => {
    cases.forEach(({ accountNumber, formatted }) => {
      const name =
        financialInstitutionShortNames[bankCode as FinancialInstitutionCode] != null
          ? `${financialInstitutionShortNames[bankCode as FinancialInstitutionCode]}(${bankCode})`
          : bankCode;

      test(`${name} "${accountNumber}" -> "${formatted}"`, () => {
        expect(formatAccountNumber(accountNumber, bankCode)).toBe(formatted);
      });
    });
  });

  it('일치하는 패턴이 없으면 오류를 발생시킨다.', () => {
    expect(() => formatAccountNumber('xxx')).toThrowError(InvalidAccountNumberError);
    expect(() => formatAccountNumber('가나다')).toThrowError(InvalidAccountNumberError);
    expect(() => formatAccountNumber('123123')).toThrowError(InvalidAccountNumberError);
  });
});
