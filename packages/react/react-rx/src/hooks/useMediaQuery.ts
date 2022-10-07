import { isServer } from '@toss/utils';
import { animationFrameScheduler, Observable, SchedulerLike } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { auditTime as auditTimeOperator, distinctUntilChanged, observeOn, startWith, switchMap } from 'rxjs/operators';

function noopMatchMedia(query: string): MediaQueryList {
  return {
    matches: query === 'all' || query === '',
    media: query,
    addListener: () => {},
    removeListener: () => {},
  } as any;
}

export const matchMedia = isServer()
  ? noopMatchMedia
  : window && window.matchMedia
  ? // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
    // call it from a different scope.
    window.matchMedia.bind(window)
  : noopMatchMedia;

function fromMediaQueryMatcher(query: string) {
  const mql = matchMedia(query);

  return new Observable<boolean>(subscriber => {
    const handler = () => {
      subscriber.next(mql.matches);
    };

    mql.addListener(handler);

    return () => {
      mql.removeListener(handler);
    };
  });
}

interface Options {
  auditTime?: number;
  scheduler?: SchedulerLike;
}

/**
 * @description
 * useMediaQuery은 media query string을 받아 일치하는지를 평가해주는 훅입니다.
 *
 * ```ts
 * useMediaQuery(
 *   // 문자열 형태의 mediaQeury를 넘겨줍니다.
 *   '(max-width: 768px)',
 *   {
 *     // auditTime 시간을 주기적으로 실시간으로 emit을 하지 않고 가장 최근 값을 emit 합니다.
 *     // - https://rxjs.dev/api/operators/auditTime
 *     // `@default 16`
 *     auditTime: 16,
 *     // 애니메이션 프레임 스케줄러
 *     // `@default animationFrameScheduler`
 *     scheduler: animationFrameScheduler
 *   }
 * )
 * // 👉 true | false
 * ```
 * @example
 * const isHandset = useMediaQuery('(max-width: 768px)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(mediaQuery: string, options?: Options) {
  const { auditTime = 16, scheduler = animationFrameScheduler } = options ?? {};

  return useObservable<boolean | null, [string, number, SchedulerLike]>(
    (_, input$) =>
      input$.pipe(
        switchMap(([query, auditTime, scheduler]) =>
          fromMediaQueryMatcher(query).pipe(observeOn(scheduler), auditTimeOperator(auditTime), distinctUntilChanged())
        ),
        startWith(matchMedia(mediaQuery).matches)
      ),
    matchMedia(mediaQuery).matches,
    [mediaQuery, auditTime, scheduler]
  );
}
