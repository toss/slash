import { DependencyList, useCallback, useRef } from 'react';

/** @tossdocs-ignore */
export function useCallbackOnce<F extends (...args: any[]) => void>(callback: F, deps: DependencyList) {
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
