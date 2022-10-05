import { getBankIconName } from './getBankIconName';

const TEST_BANK_CODE = 32; // code: bnk

describe('getBankIconName', () => {
  it('normal` type 을 제외한 다른 type 들은 이름에 type 이 surfix 로 붙는다', () => {
    expect(getBankIconName(TEST_BANK_CODE, 'fill')).toEqual('bank-fill-bnk');
    expect(getBankIconName(TEST_BANK_CODE, 'square')).toEqual('bank-square-bnk');
    expect(getBankIconName(TEST_BANK_CODE, 'normal')).toEqual('bank-bnk');
    expect(getBankIconName(TEST_BANK_CODE)).toEqual('bank-bnk');
  });
});
