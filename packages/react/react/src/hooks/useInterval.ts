import { useEffect, useRef } from 'react';

type IntervalOptions =
  | number
  | {
      delay: number | null;
      trailing?: boolean;
    };

/**
 * @description
 * window.setInterval 를 쉽게 사용할 수 있는 hook 입니다.
 *
 * ```ts
 * // number 혹은 IntervalOptions를 입력해주세요
 * type IntervalOptions =
 *   | number
 *   | {
 *       // 각 Effect 사이의 딜레이를 지정합니다.
 *       delay: number | null;
 *       // 만약 false로 지정된 경우 Effect를 즉시 실행시킵니다.
 *       trailing?: boolean;
 *     }
 * ```
 *
 * @example
 * useInterval(updateServerTime, { delay: interval });
 */
export function useInterval(callback: () => void, options: IntervalOptions) {
  const delay = typeof options === 'number' ? options : options.delay;
  const trailing = typeof options === 'number' ? undefined : options.trailing;
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (trailing === false && savedCallback.current) {
      savedCallback.current();
    }
  }, [trailing]);

  useEffect(() => {
    if (delay === null) {
      return () => {
        return;
      };
    }

    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const id = window.setInterval(tick, delay);
    return () => window.clearInterval(id);
  }, [delay]);
}
