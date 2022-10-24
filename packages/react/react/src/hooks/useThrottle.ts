import throttle from 'lodash/throttle';
import { useEffect, useMemo } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

/**
 * @description
 * lodash/throttle 를 쉽게 사용할 수 있는 hook 입니다.
 *
 * @example
 * const handle정답제출 = useThrottle(() => {
 *   set퀴즈정답제출();
 *   mutate();
 * }, 200);
 */
export function useThrottle<F extends (...args: any[]) => any>(
  callback: F,
  wait: number,
  options?: Parameters<typeof throttle>[2]
) {
  const preservedCallback = usePreservedCallback(callback);

  const throttledCallback = useMemo(() => {
    return throttle(preservedCallback, wait, options);
  }, [options, preservedCallback, wait]);

  useEffect(
    () => () => {
      throttledCallback.cancel();
    },
    [throttledCallback]
  );

  return throttledCallback;
}
