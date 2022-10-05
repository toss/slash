import { TypedStorage } from './TypedStorage';

describe('TypedStorage는', () => {
  describe('get() 메소드로', () => {
    it('주어진 key의 값을 가져온다.', () => {
      const key = 'get-test-key';
      const typed = new TypedStorage(key, { initialValue: 'some-value' });
      expect(typed.get()).toEqual('some-value');
    });
  });

  describe('set() 메소드로', () => {
    it('주어진 key의 값을 변경한다.', () => {
      const key = 'set-test-key';
      const typed = new TypedStorage(key, { initialValue: 'some-value' });
      typed.set('changed-value');
      expect(typed.get()).toEqual('changed-value');
    });
  });
});
