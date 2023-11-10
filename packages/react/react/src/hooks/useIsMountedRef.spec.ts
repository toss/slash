import { renderHook } from '@testing-library/react';

import { useIsMountedRef } from './useIsMountedRef';

describe('useIsMountedRef', () => {
  it('should return current reference object with true value if component is mounted', () => {
    const { result } = renderHook(() => useIsMountedRef());

    expect(result.current).toEqual({ isMounted: true });
  });

  it('should return current reference object with false value if component is unmounted', () => {
    const { result, unmount } = renderHook(() => useIsMountedRef());
    expect(result.current).toEqual({ isMounted: true });
    unmount();
    expect(result.current).toEqual({ isMounted: false });
  });
});
