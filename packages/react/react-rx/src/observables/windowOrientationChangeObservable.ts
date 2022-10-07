/** @tossdocs-ignore */
import { isServer } from '@toss/utils';
import { EMPTY, fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * @description
 * 모바일 장치의 방향이 바뀌는 것을 알 수 있도록 observables로 제공합니다.
 */
export const windowOrientationChangeObservable = /*#__PURE__*/ isServer()
  ? EMPTY
  : fromEvent(window, 'orientationchange').pipe(share());
