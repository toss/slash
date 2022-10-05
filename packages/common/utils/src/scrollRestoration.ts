import { noop } from './noop';

/**
 * @name scrollRestoration.set
 * @description
 * scrollRestoration 관련 set/clear를 쉽게 할 수 있도록 도와주는 helper입니다.
 *
 * @example
 * useEffect(() => {
 *   const clear = scrollRestoration.set('manual');
 *   return () => clear();
 * }, []);
 */
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
