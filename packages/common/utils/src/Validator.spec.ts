import { Validator } from '.';

describe('Validator', () => {
  describe('isEmailValid', () => {
    it('should return `true` if given value is valid', () => {
      expect(Validator.isEmailValid('hyeonsu@toss.im')).toEqual(true);
    });
    it('should return `false` if given value is not valid', () => {
      expect(Validator.isEmailValid('')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu')).toEqual(false);
      expect(Validator.isEmailValid('1234')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu@')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu@toss')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu@toss.')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu@toss.123')).toEqual(false);
      expect(Validator.isEmailValid('hyeonsu@toss.com123')).toEqual(false);
    });
  });
  describe('isBirthDateValid', () => {
    it('should return `true` if given value is valid', () => {
      expect(Validator.isBirthDateValid('960729')).toEqual(true);
      expect(Validator.isBirthDateValid('961231')).toEqual(true);
      expect(Validator.isBirthDateValid('000101')).toEqual(true);
    });
    it('should return `false` if given value is not valid', () => {
      expect(Validator.isBirthDateValid('19960729')).toEqual(false);
      expect(Validator.isBirthDateValid('foobar')).toEqual(false);
      expect(Validator.isBirthDateValid('000000')).toEqual(false);
      expect(Validator.isBirthDateValid('960732')).toEqual(false);
      expect(Validator.isBirthDateValid('')).toEqual(false);
    });
  });
  describe('isResidentRegistrationNumberValid', () => {
    it('should return `false` if given value is not valid', () => {
      expect(Validator.isRrnValid('19960729')).toEqual(false);
      expect(Validator.isRrnValid('9607291111111')).toEqual(false);
      expect(Validator.isRrnValid('')).toEqual(false);
      // 외국인 등록번호 테스트
      expect(Validator.isRrnValid('1111115111111')).toEqual(false); // 공식을 만족하는 외국인 등록번호
      expect(Validator.isRrnValid('1111115111110', { allowForeigner: true })).toEqual(false); // 공식을 만족하지 않는 외국인 등록번호
    });
    it('should return `true` if given value is valid', () => {
      // 개인 주민번호로 테스트해보았을 때 잘 동작했음 (아래는 공식을 만족하는 임의의 주민등록번호)
      expect(Validator.isRrnValid('1111111111118')).toEqual(true);
      // 외국인 등록번호 테스트 (아래는 공식을 만족하는 임의의 외국인등록번호)
      expect(Validator.isRrnValid('1111115111111', { allowForeigner: true })).toEqual(true);
    });
  });
  describe('isMobilePhone', () => {
    it('should return `true` because given value is valid', () => {
      const validPhoneNumbers = ['01012341234', '0194561234', '010-1234-4567', '+821012341234'];

      validPhoneNumbers.forEach(phone => {
        expect(Validator.isMobilePhone(phone)).toEqual(true);
      });
    });

    it('should return `false` because given value is not valid', () => {
      const invalidPhoneNumber = [
        '+201012341234',
        '0273671234',
        '031-456-1234',
        '010123412345',
        '01312341234',
        '01012345',
      ];

      invalidPhoneNumber.forEach(phone => {
        expect(Validator.isMobilePhone(phone)).toEqual(false);
      });
    });
  });

  describe('isAge', () => {
    test('자연수만 유효하다.', () => {
      const validInputs = ['123', '5', '1', '88'];
      const invalidInputs = ['0', '5.2', '-0', 'NaN', 'undefined', 'null', '5e+23', 'Infinity'];

      validInputs.forEach(ageInput => {
        expect(Validator.isAge(ageInput)).toBe(true);
      });

      invalidInputs.forEach(ageInput => {
        expect(Validator.isAge(ageInput)).toBe(false);
      });
    });
  });

  describe('isKoreanLanguage', () => {
    test('한글만 허용한다', () => {
      const validInputs = ['이현수', '김토스'];
      const invalidInputs = [
        '0',
        ' ',
        'Hyeonsu Lee',
        'Infinity',
        '',
        '🏀',
        '이현수🥎',
        '이현수B',
        'B이현수',
        '⚽️asdf',
      ];

      validInputs.forEach(ageInput => {
        expect(Validator.isKoreanLanguage(ageInput)).toBe(true);
      });

      invalidInputs.forEach(ageInput => {
        expect(Validator.isKoreanLanguage(ageInput)).toBe(false);
      });
    });
  });

  describe('isBusinessRegNo', () => {
    test('올바른 사업자 번호', () => {
      const validInputs = ['1231231231', '123-12-31231', '1234567891', '123-45-67891', '7454000360'];

      validInputs.forEach(businessRegNo => {
        expect(Validator.isBusinessRegNo(businessRegNo)).toBe(true);
      });
    });

    test('올바르지 않은 사업자번호', () => {
      const invalidInputs = ['12312312312', '1231231232'];

      invalidInputs.forEach(businessRegNo => {
        expect(Validator.isBusinessRegNo(businessRegNo)).toBe(false);
      });
    });
  });
});
