import { noop } from '@toss/utils';
import { useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

type IntervalOptions =
  | number
  | {
      delay: number | null;
      trailing?: boolean;
    };

/** @tossdocs-ignore */
export function useInterval(callback = noop, options: IntervalOptions) {
  const delay = typeof options === 'number' ? options : options.delay;
  const trailing = typeof options === 'number' ? undefined : options.trailing;
  const savedCallback = usePreservedCallback(callback);

  useEffect(() => {
    if (trailing === false) {
      savedCallback();
    }
  }, [trailing, savedCallback]);

  useEffect(() => {
    if (delay === null) {
      return () => {
        return;
      };
    }

    function tick() {
      savedCallback();
    }

    const id = window.setInterval(tick, delay);
    return () => window.clearInterval(id);
  }, [delay, savedCallback]);
}
