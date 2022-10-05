import { NumberTypedStorage } from './NumberTypedStorage';

describe('NumberTypedStorage는', () => {
  describe('increase() 메소드로', () => {
    it('주어진 key의 값을 1 증가시킨다.', () => {
      const typed = new NumberTypedStorage('increase-test', { initialValue: 10 });
      typed.increase();
      expect(typed.get()).toBe(11);
    });
  });

  describe('decrease() 메소드로', () => {
    it('주어진 key의 값을 1 감소시킨다.', () => {
      const typed = new NumberTypedStorage('decrease-test', { initialValue: 10 });
      typed.decrease();
      expect(typed.get()).toBe(9);
    });
  });
});
