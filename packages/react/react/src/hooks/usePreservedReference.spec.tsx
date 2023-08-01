import { renderHook } from '@testing-library/react';
import { usePreservedReference } from './usePreservedReference';

type TossObject = {
  toss: string;
};

describe('usePreservedReference', () => {
  const callbackReturnTrue = jest.fn(() => true);
  const callbackReturnFalse = jest.fn(() => false);

  describe('with Default Callback Function', () => {
    it('changed to the same value', () => {
      const tossObject: TossObject = { toss: '토스' };

      const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
        initialProps: { value: tossObject },
      });

      rerender({ value: { toss: '토스' } });

      expect(result.current).toBe(tossObject);
      expect(result.current).toEqual(tossObject);
    });
    it('changed to a different value', () => {
      const tossObject: TossObject = { toss: '토스' };
      const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
        initialProps: { value: tossObject },
      });

      rerender({ value: { toss: 'toss' } });

      expect(result.current).not.toBe(tossObject);
      expect(result.current).not.toEqual(tossObject);
    });
  });
  describe('with Custom Callback Function', () => {
    it('changed to the same value', () => {
      const tossObject: TossObject = { toss: '토스' };

      const { result, rerender } = renderHook(({ value }) => usePreservedReference(value, callbackReturnTrue), {
        initialProps: { value: tossObject },
      });

      rerender({ value: { toss: '토스' } });

      expect(result.current).toBe(tossObject);
    });
    it('changed to a different value', () => {
      const tossObject: TossObject = { toss: '토스' };

      const { result, rerender } = renderHook(({ value }) => usePreservedReference(value, callbackReturnFalse), {
        initialProps: { value: tossObject },
      });

      rerender({ value: { toss: '토스' } });

      expect(result.current).not.toBe(tossObject);
    });
  });
});
