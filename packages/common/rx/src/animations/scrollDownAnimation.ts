import { getScrollYOffset } from '@toss/utils';
import { map, tap } from 'rxjs/operators';
import { duration } from './core';
import { quarticInOut } from './eases';

export interface ScrollDownAnimationOptions {
  distanceOffset: number;
  durationTime: number;
}

/**
 * 목적지(distanceOffset)로 지정된 시간(durationTime)(단위: ms) 동안 부드럽게 스크롤
 * 합니다.
 * ```typescript
 * function scrollDownAnimation(options: {
 *   distanceOffset: number;
 *   durationTime: number;
 * }): Observable<number>
 * ```
 *
 * @example
 * scrollDownAnimation({
 *   distanceOffset: 500,
 *   durationTime: 255,
 * }).subscribe();
 */
export function scrollDownAnimation(options: ScrollDownAnimationOptions) {
  const startOffset = getScrollYOffset();
  const direction = options.distanceOffset > startOffset ? 1 : -1;
  const distance = Math.abs(options.distanceOffset - startOffset);

  return duration(options.durationTime).pipe(
    map(quarticInOut),
    map(timing => timing * distance),
    tap(frame => {
      window.scrollTo(0, startOffset + frame * direction);
    })
  );
}
