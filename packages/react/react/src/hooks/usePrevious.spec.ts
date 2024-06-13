import { renderHook } from '@testing-library/react';
import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 },
    });

    expect(result.current).toBe(0);

    rerender({ value: 1 });
    expect(result.current).toBe(0);

    rerender({ value: 2 });
    expect(result.current).toBe(1);
  });
  it('should return the default value on first render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value, { defaultValue: 0 }), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBe(0);

    rerender({ value: 2 });
    expect(result.current).toBe(1);
  });
});
