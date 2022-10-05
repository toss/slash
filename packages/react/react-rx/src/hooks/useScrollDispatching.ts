import { getScrollYOffset } from '@tossteam/utils';
import { useEffect } from 'react';
import { animationFrameScheduler, fromEvent } from 'rxjs';
import { map, observeOn, startWith } from 'rxjs/operators';

/**
 * @description
 * 스크롤 할 때마다 스크롤한 위치값을 콜백으로 반환합니다.
 *
 * 콜백은 레퍼런스가 변하지 않도록 주의해 주세요. 필요한 경우에만 레퍼런스를 변경하여 구독 취소 후 새로운 구독을 만듭니다.
 *
 * @example
 * import { useScrollDispatching } from '@tossteam/react-rx';
 * import { getScrollDiffFromBottom } from '@tossteam/utils';
 *
 * const PAGING_BUFFER = 600;
 * const handleScroll = useCallback(() => {
 *   const diff = getScrollDiffFromBottom();
 *   if (diff < PAGING_BUFFER) {
 *     setPage(page => page + 1);
 *   }
 * }, []);
 *
 * useScrollDispatching(handleScroll);
 */
export function useScrollDispatching(onScroll: (scrollTop: number) => void): void {
  useEffect(() => {
    const subscription = fromEvent(window.document, 'scroll')
      .pipe(
        observeOn(animationFrameScheduler),
        map(() => getScrollYOffset()),
        startWith(getScrollYOffset())
      )
      .subscribe(scrollYOffset => {
        onScroll(scrollYOffset);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [onScroll]);
}
