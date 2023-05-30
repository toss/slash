import { useEffect, useRef } from 'react';

/** @tossdocs-ignore */
export function useTimeout(callback: () => void, delay = 0) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function handleTimeout() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const id = window.setTimeout(handleTimeout, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [delay]);
}
