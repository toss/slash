import { noop } from '@toss/utils';
import { useEffect, useState } from 'react';
import { usePreservedCallback } from './usePreservedCallback';

type IntervalOptions =
  | number
  | {
      delay: number | null;
      trailing?: boolean;
    };

/** @tossdocs-ignore */
export function useInterval(callback: () => void, options: IntervalOptions) {
  const [running, setRunning] = useState(true);
  const delay = typeof options === 'number' ? options : options.delay;
  const trailing = typeof options === 'number' ? undefined : options.trailing;
  const savedCallback = usePreservedCallback(callback ?? noop);

  const stop = () => setRunning(false);
  const resume = () => setRunning(true);

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
      if (running) savedCallback();
    }

    const id = window.setInterval(tick, delay);
    return () => window.clearInterval(id);
  }, [delay, savedCallback, running]);

  return { intervalRunning: running, stop, resume };
}
