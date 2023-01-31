import { NumberTypedStorage } from './NumberTypedStorage';

describe('NumberTypedStorage', () => {
  describe('increase() method', () => {
    it('should increase the value of the given key by 1. when given no argument', () => {
      const typed = new NumberTypedStorage('increase-test-no-argument', { initialValue: 10 });
      typed.increase();
      expect(typed.get()).toBe(11);
    });
    it('should increase the value of the given key by argument.', () => {
      const typed = new NumberTypedStorage('increase-test-with-argument', { initialValue: 10 });
      typed.increase(10);
      expect(typed.get()).toBe(20);
      typed.increase(10);
      expect(typed.get()).toBe(30);
    });
  });

  describe('decrease() method', () => {
    it('should decrease the value of the given key by 1. when given no argument', () => {
      const typed = new NumberTypedStorage('decrease-test-no-argument', { initialValue: 10 });
      typed.decrease();
      expect(typed.get()).toBe(9);
    });
    it('should decrease the value of the given key by argument.', () => {
      const typed = new NumberTypedStorage('decrease-test-with-argument', { initialValue: 50 });
      typed.decrease(10);
      expect(typed.get()).toBe(40);
      typed.decrease(10);
      expect(typed.get()).toBe(30);
    });
  });
});
