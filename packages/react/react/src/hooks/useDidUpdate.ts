import { DependencyList, useEffect, useRef } from 'react';

/**
 * @name useDidUpdate
 * @description
 * deps로 들어간 값이 업데이트 되었을 때 effect를 실행합니다.
 *
 * - 최초 마운트 시에는 effect가 실행되지 않습니다.
 * - componentDidUpdate() 메소드와 비슷합니다.
 *
 * @example
 * useDidUpdate(() => {
 *   // value가 '바뀌면' 실행됨
 * }, [value])
 */
export function useDidUpdate<F extends () => (() => void) | void>(effect: F, deps: DependencyList) {
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
