/** @tossdocs-ignore */
import { ComponentProps, Suspense, useEffect } from 'react';

export type SSRSuspenseTimeoutHandler = (payload: { timeout: number }) => void;

/**
 * SSRSuspense에서 사용될 timeout options
 **/
export interface SSRSuspenseTimeoutOptions {
  /**
   * @desc timeout in ms
   **/
  timeout: number;
  /**
   * @desc function called on timeout expiry
   **/
  onTimeout: SSRSuspenseTimeoutHandler;
}

interface Props extends Pick<ComponentProps<typeof Suspense>, 'fallback'> {
  timeoutOptions: SSRSuspenseTimeoutOptions;
}

export function TimeoutWrapper({ fallback, timeoutOptions }: Props) {
  useEffect(() => {
    if (typeof window === 'undefined' || timeoutOptions.timeout < 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      timeoutOptions.onTimeout({
        timeout: timeoutOptions.timeout,
      });
    }, timeoutOptions.timeout);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [timeoutOptions]);

  return <>{fallback}</>;
}
