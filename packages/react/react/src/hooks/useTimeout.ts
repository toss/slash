// import { useEffect } from 'react';
import { useEffect, useRef } from 'react';

/**
 * @description
 * window.setTimeout 를 편리하게 이용할 수 있는 hook 입니다.
 *
 * @example
 * useTimeout(() => {
 *   setTitle(`상품을 찾고있어요`);
 * }, 2000);
 *
 * useTimeout(() => {
 *   setTitle(`거의 다 끝났어요`);
 * }, 4000);
 */
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
