import { fireEvent, renderHook } from '@testing-library/react';
import { generateStorage } from '@toss/storage';
import { useLocalStorageChangeDetector } from './useLocalStorageChangeDetector';

const tossKey = 'tossKey';
const tossValue = 'tossValue';
const tossValue2 = 'tossValue2';

function mockVisibilityState(visibilityState: Document['visibilityState']) {
  Object.defineProperty(document, 'visibilityState', { value: visibilityState, writable: true });
  fireEvent(document, new Event('visibilitychange'));
}

const safeLocalStorage = generateStorage();
describe('useLocalStorageChangeDetector', () => {
  beforeEach(() => {
    safeLocalStorage.set(tossKey, tossValue);
  });
  describe('When it becomes visible, the value should be updated', () => {
    it('When the clearStorage function is executed, the value should be null.', () => {
      const { result } = renderHook(() => useLocalStorageChangeDetector(tossKey));
      const { clearStorage } = result.current[1];

      expect(result.current[0]).toBe(tossValue);

      clearStorage();

      mockVisibilityState('visible');

      expect(result.current[0]).toBeNull();
    });
    it('The local storage value should be updated when it changes', () => {
      const { result } = renderHook(() => useLocalStorageChangeDetector(tossKey));

      expect(result.current[0]).toBe(tossValue);

      safeLocalStorage.set(tossKey, tossValue2);

      mockVisibilityState('visible');

      expect(result.current[0]).toBe(tossValue2);
    });
  });
  describe('The value should not be updated when it is hidden', () => {
    it('The value should not be updated when the clearStorage function is executed', () => {
      const { result } = renderHook(() => useLocalStorageChangeDetector(tossKey));
      const { clearStorage } = result.current[1];

      expect(result.current[0]).toBe(tossValue);

      clearStorage();

      mockVisibilityState('hidden');

      expect(result.current[0]).toBe(tossValue);
    });
    it('The value should not be changed even when it becomes a local storage value', () => {
      const { result } = renderHook(() => useLocalStorageChangeDetector(tossKey));

      expect(result.current[0]).toBe(tossValue);

      safeLocalStorage.set(tossKey, tossValue2);

      mockVisibilityState('hidden');

      expect(result.current[0]).toBe(tossValue);
    });
  });
});
