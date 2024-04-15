import { act, renderHook } from '@testing-library/react';
import { useToggleState } from './useToggleState';

describe('useToggleState', () => {
  describe('Return Value Type Check ', () => {
    const { result } = renderHook(() => useToggleState());

    const [bool, toggle] = result.current;

    it('The type of bool is boolean.', () => {
      expect(typeof bool).toBe('boolean');
    });

    it('The toggle type is function.', () => {
      expect(typeof toggle).toBe('function');
    });
  });

  describe('Check Initial Value', () => {
    it('Default argument is false, and the return value is false.', () => {
      const { result } = renderHook(() => useToggleState());
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('If the argument is false, the return value is also false.', () => {
      const { result } = renderHook(() => useToggleState(false));
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('If the argument is true, the return value is also true.', () => {
      const { result } = renderHook(() => useToggleState(true));
      const [bool] = result.current;

      expect(bool).toBe(true);
    });
  });

  describe('Execute toggle', () => {
    it('When toggle is executed, the value of bool changes from true to false, or from false to true.', () => {
      const { result } = renderHook(() => useToggleState());

      const [, toggle] = result.current;

      {
        act(toggle);
        const bool = result.current[0];
        expect(bool).toBe(true);
      }

      {
        act(toggle);
        const bool = result.current[0];
        expect(bool).toBe(false);
      }

      {
        act(toggle);
        const bool = result.current[0];
        expect(bool).toBe(true);
      }
    });
  });
});
