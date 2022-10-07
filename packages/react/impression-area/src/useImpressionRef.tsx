import { usePreservedCallback, useRefEffect } from '@toss/react';
import { noop } from '@toss/utils';
import debounce from 'lodash.debounce';
import { useMemo, useRef } from 'react';
import { ImpressionAreaProps } from './ImpressionArea';

type Options = Pick<
  ImpressionAreaProps,
  'rootMargin' | 'onImpressionStart' | 'onImpressionEnd' | 'timeThreshold' | 'areaThreshold'
>;

/**
 * @name useImpressionRef
 * @description
 * `ref` 가 주어진 요소가 브라우저 뷰포트에 보여지거나 사라지는 시점에 이벤트를 발생시키는 Hook입니다.
 * [IntersectionObserver](https://developer.mozilla.org/ko/docs/Web/API/Intersection_Observer_API) API를 사용하여 효율적으로 동작합니다.
 *
 * 컴포넌트로 사용하려면 `ImpressionArea`를 사용하세요.
 *
 * ```tsx
 * const ref = useImpressionRef({
 *   // 요소가 브라우저 뷰포트 진입시 호출되는 callback
 *   onImpressionStart: () => {},
 *
 *   // 요소가 브라우저 뷰포트에서 나왔을 때 호출되는 callback
 *   onImpressionEnd: () => {},
 *
 *   // 실제 요소가 차지하는 것 대비 얼마나 margin을 줄 것인지 지정 (`string`)
 *   // [MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) 을 참고하세요.
 *   rootMargin,
 *
 *   // 몇 퍼센트 이상 보여졌을 때 진입한 것인지 지정, 0~1까지의 숫자. (`number`)
 *   // @default 0
 *   areaThreshold,
 *
 *   // 몇 밀리세컨드 이상 화면에 진입해 있을 때 impression 이벤트를 호출할지 지정, ms 단위. (`number`)
 *   // @default 0
 *   timeThreshold,
 * });
 *
 * <div ref={ref}>
 *  내가 보여지면 onImpressionStart를 호출해줘
 * </div>
 * ```
 */
export function useImpressionRef<Element extends HTMLElement>({
  onImpressionStart: _onImpressionStart,
  onImpressionEnd: _onImpressionEnd,
  timeThreshold = 0,
  rootMargin,
  areaThreshold: impressionRatio = 0,
}: Options) {
  const onImpressionStart = usePreservedCallback(_onImpressionStart ?? noop);
  const onImpressionEnd = usePreservedCallback(_onImpressionEnd ?? noop);

  const state = useRef({ isImpressed: false }).current;

  const observer = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const handleImpression = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]!;
      const currentRatio = entry.intersectionRatio;

      const didImpressionEnd = impressionRatio === 0 ? !entry.isIntersecting : currentRatio < impressionRatio;

      const handleImpressionStart = debounce(() => {
        if (state.isImpressed) {
          return;
        }

        onImpressionStart?.();
        state.isImpressed = true;
      }, timeThreshold);

      const handleImpressionEnd = debounce(() => {
        if (!state.isImpressed) {
          return;
        }

        onImpressionEnd?.();
        state.isImpressed = false;
      }, timeThreshold);

      if (didImpressionEnd) {
        handleImpressionStart.cancel();
        handleImpressionEnd();
      } else {
        handleImpressionEnd.cancel();
        handleImpressionStart();
      }
    };

    const observer = new IntersectionObserver(handleImpression, {
      rootMargin,
      threshold: impressionRatio,
    });

    return observer;
  }, [impressionRatio, onImpressionEnd, onImpressionStart, rootMargin, state, timeThreshold]);

  const ref = useRefEffect<Element>(
    element => {
      observer?.observe(element);

      return () => {
        observer?.unobserve(element);
      };
    },
    [onImpressionStart, onImpressionEnd]
  );

  return ref;
}
