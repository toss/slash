import { isMobilePhone } from './is-mobile-phone';

describe('isMobilePhone', () => {
  it('should return `true` because given value is valid', () => {
    const validPhoneNumbers = ['01012341234', '0194561234', '010-1234-4567', '+821012341234'];

    validPhoneNumbers.forEach(phone => {
      expect(isMobilePhone(phone)).toEqual(true);
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
      expect(isMobilePhone(phone)).toEqual(false);
    });
  });
});
