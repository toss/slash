import { TypedStorage } from './TypedStorage';

describe('TypedStorage', () => {
  describe('using get() method', () => {
    it('should be get value of given key', () => {
      const key = 'get-test-key';
      const typed = new TypedStorage(key, { initialValue: 'some-value' });
      expect(typed.get()).toEqual('some-value');
    });
  });

  describe('using set() method', () => {
    it('should change value of given key', () => {
      const key = 'set-test-key';
      const typed = new TypedStorage(key, { initialValue: 'some-value' });
      typed.set('changed-value');
      expect(typed.get()).toEqual('changed-value');
    });
  });

  describe('using clear() method', () => {
    it('should clear value of given key', () => {
      const key = 'clear-test-key';
      const typed = new TypedStorage(key, { initialValue: 'some-value' });
      typed.clear();
      expect(typed.get()).toBeNull();
    });
  });
});
