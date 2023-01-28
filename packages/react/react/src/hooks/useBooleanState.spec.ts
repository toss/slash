import { act, renderHook } from '@testing-library/react';

import { useBooleanState } from './useBooleanState';

describe('`useBooleanState`', () => {
  describe('반환 값 타입 체크', () => {
    const { result } = renderHook(useBooleanState);

    const [bool] = result.current;

    it('bool의 타입은 boolean이다.', () => {
      expect(typeof bool).toBe('boolean');
    });
  });

  describe('초기값 체크', () => {
    it('디폴트 인자는 false로 반환값은 false이다.', () => {
      const { result } = renderHook(useBooleanState);
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('인자가 false면 반환값도 false이다.', () => {
      const { result } = renderHook(() => useBooleanState(false));
      const [bool] = result.current;

      expect(bool).toBe(false);
    });

    it('인자가 true면 반환값도 true이다.', () => {
      const { result } = renderHook(() => useBooleanState(true));
      const [bool] = result.current;

      expect(bool).toBe(true);
    });
  });

  it('`setBool(true)` 실행 시, `bool`은 `true`가 된다.', () => {
    {
      const { result } = renderHook(() => useBooleanState(false));
      const [, setBool] = result.current;

      act(() => setBool(true));

      const [bool] = result.current;

      expect(bool).toBe(true);
    }
  });

  it('`setBool(false)` 실행 시, `bool`은 `false`가 된다.', () => {
    {
      const { result } = renderHook(() => useBooleanState(true));
      const [, setBool] = result.current;

      act(() => setBool(false));

      const [bool] = result.current;

      expect(bool).toBe(false);
    }
  });

  it('`toggle` 실행 시, `bool`은 `true` -> `false`, `false` -> `true`가 된다.', () => {
    const { result } = renderHook(() => useBooleanState(true));
    const [, setBool] = result.current;

    {
      act(() => setBool());

      const [bool] = result.current;

      expect(bool).toBe(false);
    }

    {
      act(() => setBool());

      const [bool] = result.current;

      expect(bool).toBe(true);
    }

    {
      act(() => setBool());

      const [bool] = result.current;

      expect(bool).toBe(false);
    }
  });
});
