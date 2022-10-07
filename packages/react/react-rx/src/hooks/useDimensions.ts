import { animationFrameScheduler, merge, Observable } from 'rxjs';
import { map, observeOn, startWith, withLatestFrom } from 'rxjs/operators';
import { isServer } from '@toss/utils';
import { useObservable } from 'rxjs-hooks';
import produce from 'immer';
import { windowResizeObservable } from '../observables/windowResizeObservable';
import { windowOrientationChangeObservable } from '../observables/windowOrientationChangeObservable';

interface Dimensions {
  width: undefined | number;
  height: undefined | number;
}

type ElementLike = Window | Document | HTMLElement;

/**
 * @description
 * 인자로 받은 Element의 width와 height를 알려줍니다.
 * window resize 이벤트가 발생하면 다시 계산합니다.
 * 만약 Element를 인자로 넘기지 않는다면, window의 width와 height를 return 합니다.
 *
 * ```ts
 * // elementRef.current 👉 Window | Document | HTMLElement
 * const { width, height } = useDimensions(elementRef.current);
 * ```
 *
 * @example
 * import { useDimensions } from '@toss/react-rx';
 *
 * const elementRef = useRef<HTMLDivElement>(null);
 *
 * const { width, height } = useDimensions(elementRef.current);
 * const { width: windowWidth, height: windowHeight } = useDimensions();
 *
 * <div ref={elementRef}>Hello</div>
 * <p>
 *   Div의 offsetWidth: {width}px, offsetHeight: {height}px 입니다
 * </p>
 * <p>
 *  Window/Viewport의 width: {windowWidth}px, height: {windowHeight}px 입니다
 * </p>
 *
 */
export function useDimensions(el?: ElementLike) {
  return useObservable(
    (state$: Observable<Dimensions>, inputs$: Observable<[ElementLike | undefined]>) =>
      merge(windowResizeObservable, windowOrientationChangeObservable).pipe(
        observeOn(animationFrameScheduler),
        startWith(true),
        withLatestFrom(state$, inputs$),
        map(([, state, inputs]) =>
          produce(state, draft => {
            const [el] = inputs;
            const { width, height } = getDimensions(el);
            draft.width = width;
            draft.height = height;
          })
        )
      ),
    { width: undefined, height: undefined },
    [el]
  );
}

function getDimensions(el?: ElementLike) {
  if (isServer()) {
    return {
      width: undefined,
      height: undefined,
    };
  }
  /* CrossBrowser width and height, https://stackoverflow.com/a/36711188 */
  if (el == null || el instanceof Window || el instanceof Document) {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
  }
  /* border를 포함한 element의 width와 height, https://stackoverflow.com/a/21064102 */
  return {
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}
