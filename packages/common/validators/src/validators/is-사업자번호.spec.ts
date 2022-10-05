import { is사업자번호 } from './is-사업자번호';

describe('is사업자번호', () => {
  test('올바른 사업자 번호', () => {
    const validInputs = ['1231231231', '123-12-31231', '1234567891', '123-45-67891', '7454000360'];

    validInputs.forEach(businessRegNo => {
      expect(is사업자번호(businessRegNo)).toBe(true);
    });
  });

  test('올바르지 않은 사업자번호', () => {
    const invalidInputs = ['12312312312', '1231231232'];

    invalidInputs.forEach(businessRegNo => {
      expect(is사업자번호(businessRegNo)).toBe(false);
    });
  });
});
