import { noop } from '@toss/utils';
import { useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

/** @tossdocs-ignore */
export function useTimeout(callback: () => void, delay = 0) {
  const savedCallback = usePreservedCallback(callback ?? noop);

  useEffect(() => {
    const timeoutId = window.setTimeout(savedCallback, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, savedCallback]);
}
