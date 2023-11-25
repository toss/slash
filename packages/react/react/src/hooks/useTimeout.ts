import { useEffect, useRef } from 'react';

/** @tossdocs-ignore */
export function useTimeout(callback: () => void, delay = 0) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleTimeout() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const timeoutId = window.setTimeout(handleTimeout, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delay]);
}
