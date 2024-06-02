import { renderHook } from '@testing-library/react';
import { useUnmount } from './useUnmount';

describe('useUnMount', () => {
  it('should call provided callback on unmount', () => {
    const mockFn = jest.fn();

    const { unmount } = renderHook(() => useUnmount(mockFn));

    expect(mockFn).not.toBeCalled();

    unmount();

    expect(mockFn).toBeCalled();
  });

  it('should call provided callback if is has been changed', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();

    const { rerender, unmount } = renderHook(
      (callback) => useUnmount(callback),
      { initialProps: mockFn1 }
    );

    rerender(mockFn2);

    unmount();

    expect(mockFn1).not.toBeCalled();
    expect(mockFn2).toBeCalled();
  });
});
