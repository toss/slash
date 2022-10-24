import { act, renderHook } from '@testing-library/react';

import { useBooleanState } from './useBooleanState';

describe('`useBooleanState`', () => {
  describe('반환 값 타입 체크', () => {
    const { result } = renderHook(useBooleanState);

    const [bool, setTrue, setFalse] = result.current;

    it('bool의 타입은 boolean이다.', () => {
      expect(typeof bool).toBe('boolean');
    });

    it('setTrue의 타입은 function이다.', () => {
      expect(typeof setTrue).toBe('function');
    });

    it('setFalse의 타입은 function이다.', () => {
      expect(typeof setFalse).toBe('function');
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

  it('`setTrue` 실행 시, `bool`은 `true`가 된다.', () => {
    {
      const { result } = renderHook(() => useBooleanState(false));
      const [, setTrue] = result.current;

      act(() => {
        setTrue();
      });

      const [bool] = result.current;

      expect(bool).toBe(true);
    }
  });

  it('`setFalse` 실행 시, `bool`은 `false`가 된다.', () => {
    {
      const { result } = renderHook(() => useBooleanState(true));
      const [, , setFalse] = result.current;

      act(() => {
        setFalse();
      });

      const [bool] = result.current;

      expect(bool).toBe(false);
    }
  });

  it('`toggle` 실행 시, `bool`은 `true` -> `false`, `false` -> `true`가 된다.', () => {
    const { result } = renderHook(() => useBooleanState(true));
    const [, , , toggle] = result.current;

    {
      act(toggle);

      const [bool] = result.current;

      expect(bool).toBe(false);
    }

    {
      act(toggle);

      const [bool] = result.current;

      expect(bool).toBe(true);
    }

    {
      act(toggle);

      const [bool] = result.current;

      expect(bool).toBe(false);
    }
  });
});
