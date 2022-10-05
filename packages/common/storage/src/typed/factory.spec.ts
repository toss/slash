import { createTypedLocalStorage, createTypedSessionStorage } from './factory';
import { TypedStorage, NumberTypedStorage } from './storages';

describe('createTypedLocalStorage는', () => {
  describe('initial value가 number인 경우', () => {
    it('NumberTypedStorage의 instance를 리턴한다.', () => {
      expect(createTypedLocalStorage('number-type-value', { initialValue: 0 })).toBeInstanceOf(NumberTypedStorage);
    });
  });

  describe('그 외의 경우', () => {
    it('TypedStorage의 instance를 리턴한다.', () => {
      expect(createTypedLocalStorage('object-type-value', { initialValue: { foo: 'bar' } })).toBeInstanceOf(
        TypedStorage
      );
    });
  });
});

describe('createTypedSessionStorage는', () => {
  it('NumberTypedStorage의 instance를 리턴한다.', () => {
    expect(createTypedSessionStorage('number-type-value', { initialValue: 0 })).toBeInstanceOf(NumberTypedStorage);
  });

  describe('initial value가 number인 경우', () => {
    it('NumberTypedStorage의 instance를 리턴한다.', () => {
      expect(createTypedSessionStorage('number-type-value', { initialValue: 0 })).toBeInstanceOf(NumberTypedStorage);
    });
  });

  describe('그 외의 경우', () => {
    it('TypedStorage의 instance를 리턴한다.', () => {
      expect(createTypedSessionStorage('object-type-value', { initialValue: { foo: 'bar' } })).toBeInstanceOf(
        TypedStorage
      );
    });
  });
});
