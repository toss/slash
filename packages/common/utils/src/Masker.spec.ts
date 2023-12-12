import { Masker } from './Masker';

describe('Masker', () => {
  describe('maskName', () => {
    it('should mask a two-letter Korean name', () => {
      expect(Masker.maskName('이한')).toBe('이*');
    });
    it('should mask a three-letter Korean name', () => {
      expect(Masker.maskName('강찬규')).toBe('강*규');
      expect(Masker.maskName('김도환')).toBe('김*환');
      expect(Masker.maskName('정석호')).toBe('정*호');
    });
    it('should mask a four-letter Korean name', () => {
      expect(Masker.maskName('남궁토스')).toBe('남**스');
      expect(Masker.maskName('독고토스')).toBe('독**스');
    });
    it('should mask an English name with less than 6 characters', () => {
      expect(Masker.maskName('Hi')).toBe('Hi');
      expect(Masker.maskName('Amy')).toBe('A*y');
      expect(Masker.maskName('John')).toBe('J**n');
      expect(Masker.maskName('David')).toBe('D***d');
    });
    it('should properly mask an English name with 6 or more characters', () => {
      expect(Masker.maskName('John Legend')).toBe('Jo** ****nd');
      expect(Masker.maskName('Hello World')).toBe('He*** ***ld');
    });
  });

  describe('maskPhoneNumber', () => {
    it('should properly mask a phone number separated by hyphens', () => {
      expect(Masker.maskPhoneNumber('010-1234-5678')).toBe('010-****-5678');
      expect(Masker.maskPhoneNumber('02-123-4567')).toBe('02-***-4567');
      expect(Masker.maskPhoneNumber('02-1234-5678')).toBe('02-****-5678');
      expect(Masker.maskPhoneNumber('031-222-2222')).toBe('031-***-2222');
    });
    it('should mask a phone number not separated by hyphens', () => {
      expect(Masker.maskPhoneNumber('01012345678')).toBe('010****5678');
      expect(Masker.maskPhoneNumber('021234567')).toBe('02***4567');
      expect(Masker.maskPhoneNumber('0212345678')).toBe('02****5678');
      expect(Masker.maskPhoneNumber('0312222222')).toBe('031***2222');
    });
  });
});
