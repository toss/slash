import { isBirthDate6 } from './is-birth-date-6';

describe('isBirthDate6', () => {
  describe('when given value is a valid string of 6 digits', () => {
    it('should return true for valid value', () => {
      expect(isBirthDate6('960729')).toEqual(true);
      expect(isBirthDate6('961231')).toEqual(true);
      expect(isBirthDate6('000101')).toEqual(true);
      expect(isBirthDate6('000229')).toEqual(true);
    });
  });

  describe('when given value is not a valid string of 6 digits', () => {
    it('should return false for invalid formats', () => {
      expect(isBirthDate6('19960729')).toEqual(false);
      expect(isBirthDate6('foobar')).toEqual(false);
      expect(isBirthDate6('000000')).toEqual(false);
      expect(isBirthDate6('')).toEqual(false);
    });

    it('should return false for out of range values', () => {
      expect(isBirthDate6('960732')).toEqual(false);
      expect(isBirthDate6('951301')).toEqual(false);
      expect(isBirthDate6('970000')).toEqual(false);
      expect(isBirthDate6('950431')).toEqual(false);
    });

    it('should return false for leap year edge cases', () => {
      expect(isBirthDate6('990229')).toEqual(false);
      expect(isBirthDate6('210029')).toEqual(false);
    });
  });
});
