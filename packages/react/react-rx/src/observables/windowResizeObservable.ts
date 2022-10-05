/** @tossdocs-ignore */
import { isServer } from '@tossteam/utils';
import { EMPTY, fromEvent } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * @description
 * window resize 이벤트가 발생한 것을 알 수 있도록 observables로 제공합니다.
 */
export const windowResizeObservable = /*#__PURE__*/ isServer() ? EMPTY : fromEvent(window, 'resize').pipe(share());
