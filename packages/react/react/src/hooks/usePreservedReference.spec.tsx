import { renderHook } from '@testing-library/react';
import { usePreservedReference } from './usePreservedReference';

describe('usePreservedReference', () => {
  it('should return the initial value', () => {
    const initialValue = { name: 'toss' };

    const { result } = renderHook(({ value }) => usePreservedReference(value), {
      initialProps: { value: initialValue },
    });

    expect(result.current).toBe(initialValue);
  });

  it('should return the original reference if areDeeplyEqual returns true', () => {
    const initialValue = { name: 'toss' };

    const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
      initialProps: { value: initialValue },
    });

    rerender({ value: { name: 'toss' } });
    expect(result.current).toBe(initialValue);
  });

  it('should return the new reference if areDeeplyEqual returns false', () => {
    const initialValue = { name: 'toss' };
    const newValue = { name: 'react' };

    const { result, rerender } = renderHook(({ value }) => usePreservedReference(value), {
      initialProps: { value: initialValue },
    });

    rerender({ value: newValue });
    expect(result.current).toBe(newValue);

    rerender({ value: { name: 'react' } });
    expect(result.current).toBe(newValue);
  });

  it('should be able to customize areValuesEqual function and return rules are same', () => {
    const initialValue = [0, 1, 2];
    const newValue = [1, 2, 3];

    const tempComparator = (a: number[], b: number[]) => {
      return a[0] === b[0];
    };

    const { result, rerender } = renderHook(({ value }) => usePreservedReference(value, tempComparator), {
      initialProps: { value: initialValue },
    });

    rerender({ value: [0, 1, 4] });
    expect(result.current).toBe(initialValue);

    rerender({ value: newValue });
    expect(result.current).toBe(newValue);

    rerender({ value: [1, 4, 5] });
    expect(result.current).toBe(newValue);
  });
});
