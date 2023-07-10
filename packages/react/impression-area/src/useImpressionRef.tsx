/** @tossdocs-ignore */
import { usePreservedCallback, useRefEffect } from '@toss/react';
import { noop } from '@toss/utils';
import debounce from 'lodash.debounce';
import { useMemo, useRef } from 'react';
import { ImpressionAreaProps } from './ImpressionArea';

type Options = Pick<
  ImpressionAreaProps,
  'rootMargin' | 'onImpressionStart' | 'onImpressionEnd' | 'timeThreshold' | 'areaThreshold' | 'root'
>;

export function useImpressionRef<Element extends HTMLElement>({
  onImpressionStart: _onImpressionStart,
  onImpressionEnd: _onImpressionEnd,
  timeThreshold = 0,
  root,
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
      root,
      rootMargin,
      threshold: impressionRatio,
    });

    return observer;
  }, [impressionRatio, onImpressionEnd, onImpressionStart, root, rootMargin, state, timeThreshold]);

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
