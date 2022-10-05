/** @tossdocs-ignore */
import { useEffect, useRef } from 'react';

interface Options {
  throttle?: boolean;
}

export function useScrollEventListener(onScroll: () => void, { throttle = true }: Options = {}): void {
  const isQueuedRef = useRef(false);

  useEffect(() => {
    isQueuedRef.current = false;

    const handleScrollEvent = () => {
      if (throttle && isQueuedRef.current) {
        return;
      }

      window.requestAnimationFrame(() => {
        onScroll();
        isQueuedRef.current = false;
      });

      isQueuedRef.current = true;
    };

    window.addEventListener('resize', handleScrollEvent);
    window.addEventListener('scroll', handleScrollEvent);
    handleScrollEvent();

    return () => {
      window.removeEventListener('resize', handleScrollEvent);
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [onScroll, throttle]);
}
