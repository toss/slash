/** @tossdocs-ignore */
import { noop } from './noop';

export const scrollRestoration = {
  set(value: 'manual' | 'auto') {
    if (!('scrollRestoration' in window.history)) {
      return noop;
    }

    const originalScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = value;

    return () => {
      window.history.scrollRestoration = originalScrollRestoration;
    };
  },
};
