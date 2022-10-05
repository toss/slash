import { DependencyList, useCallback, useRef } from 'react';

/**
 * @name useCallbackOnce
 * @description
 * `useCallback`과 유사하지만 콜백을 최초 단 1회만 실행합니다.
 *
 * mount 시에만 실행할 effect를 정의하는 데에 사용할 수 있습니다.
 *
 * @example
 * const openAlert = useCallbackOnce(() => {
 *   alert('이 alert은 1번만 호출돼요');
 * }, []);
 *
 * useEffect(() => {
 *   openAlert();
 * }, [openAlert]);
 */
export default function useCallbackOnce<F extends (...args: any[]) => void>(callback: F, deps: DependencyList) {
  const hasFired = useRef(false);
  const memoizedCallback = useCallback((...args: Parameters<F>) => {
    if (hasFired.current) {
      return;
    }

    callback(...args);
    hasFired.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return memoizedCallback;
}
