import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

describe('usePreservedCallback', () => {
  it('returns updated value from the callback after state change', () => {
    const { result } = renderHook(() => {
      const [stateValue, setStateValue] = useState(10);
      const testCallback = jest.fn(() => stateValue);
      const preservedCallback = usePreservedCallback(testCallback);

      return { preservedCallback, setStateValue };
    });

    const initialValue = result.current.preservedCallback();
    expect(initialValue).toBe(10);

    act(() => {
      result.current.setStateValue(20);
    });

    const updatedValue = result.current.preservedCallback();
    expect(updatedValue).toBe(20);
  });

  it('preserves the callback reference even after state updates', () => {
    const { result, rerender } = renderHook(() => {
      const [stateValue, setStateValue] = useState<number>(10);
      const testCallback = jest.fn(() => stateValue);
      const preservedCallback = usePreservedCallback(testCallback);

      return { preservedCallback, setStateValue };
    });

    const initialCallback = result.current.preservedCallback;
    expect(initialCallback()).toBe(10);

    act(() => {
      result.current.setStateValue(20);
    });

    const updatedCallback = result.current.preservedCallback;
    expect(updatedCallback()).toBe(20);
    expect(updatedCallback).toBe(initialCallback);

    rerender();

    const rerenderedCallback = result.current.preservedCallback;
    expect(rerenderedCallback()).toBe(20);
    expect(rerenderedCallback).toBe(updatedCallback);
  });

  it('ensures arguments are correctly passed to the wrapped callback function', () => {
    const externalCallback = jest.fn((increment: number) => increment);

    const { result } = renderHook(() => usePreservedCallback(externalCallback));

    act(() => {
      result.current(10);
    });

    expect(externalCallback).toHaveBeenCalledTimes(1);
    expect(externalCallback).toHaveBeenCalledWith(10);
    expect(externalCallback.mock.results[0].value).toBe(10);
  });
});
