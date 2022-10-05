import { renderHook } from '@testing-library/react';
import useIsMounted from './useIsMounted';

describe('useIsMounted', () => {
  it('컴포넌트 마운트 이후 true를 반환한다.', () => {
    const { result } = renderHook(() => useIsMounted());

    expect(result.current).toBeTruthy();
  });
});
