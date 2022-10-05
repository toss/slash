import { useRef, useCallback, useEffect } from 'react';

interface ScrollEffectOptions {
  difference?: number;
}

/**
 * @description
 * globalContentArea 기반으로 스크롤 이벤트를 쉽게 사용할 수 있는 hook 입니다.
 *
 * ```ts
 * interface ScrollEffectOptions {
 *   // 이 이상의 px격차가 생길때만 Effect를 실행시킵니다.
 *   difference?: number;
 * }
 * function useScrollEffect(
 *   callback: (scrollTop: number) => void,
 *   options: ScrollEffectOptions = {},
 * ):void;
 * ```
 */
export default function useScrollEffect(callback: (scrollTop: number) => void, options: ScrollEffectOptions = {}) {
  const globalContentArea = useRef<HTMLDivElement>();
  const prevScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollTop = globalContentArea.current!.scrollTop;
    const shouldFire = Math.abs(prevScrollTop.current - currentScrollTop) > (options.difference || 0);

    if (shouldFire) {
      callback(currentScrollTop);
      prevScrollTop.current = currentScrollTop;
    }
  }, [callback, options.difference]);

  useEffect(() => {
    globalContentArea.current = document.querySelector('.global-content-area') as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (globalContentArea.current === undefined) {
      return;
    }

    globalContentArea.current.addEventListener('scroll', handleScroll);

    return () => {
      globalContentArea.current!.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
}
