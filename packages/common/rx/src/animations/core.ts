/** @tossdocs-ignore */
import { animationFrameScheduler, defer, Observable, range } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

/** Observable이 구독된 이후 지난 시간을 rAF 마다 반환합니다. */
export function timeElapsed(scheduler = animationFrameScheduler): Observable<number> {
  return defer(() => {
    const start = scheduler.now();

    return range(0, Number.POSITIVE_INFINITY, scheduler).pipe(map(() => scheduler.now() - start));
  });
}

/** 지정된 시간(단위: ms)동안 0-1 까지 반환합니다. */
export function duration(milliseconds: number, scheduler = animationFrameScheduler): Observable<number> {
  return timeElapsed(scheduler).pipe(
    map(elapsedMilliseconds => elapsedMilliseconds / milliseconds),
    takeWhile(timing => timing <= 1)
  );
}
