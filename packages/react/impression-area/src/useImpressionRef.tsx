/** @tossdocs-ignore */
import { usePreservedCallback, useRefEffect } from '@toss/react';
import { noop } from '@toss/utils';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { ImpressionAreaProps } from './ImpressionArea';

type Options = Pick<
  ImpressionAreaProps,
  'rootMargin' | 'onImpressionStart' | 'onImpressionEnd' | 'timeThreshold' | 'areaThreshold'
>;

export function useImpressionRef<Element extends HTMLElement>({
  onImpressionStart: _onImpressionStart,
  onImpressionEnd: _onImpressionEnd,
  timeThreshold = 0,
  rootMargin,
  areaThreshold: intersectThreshold = 0,
}: Options) {
  const onImpressionStart = usePreservedCallback(_onImpressionStart ?? noop);
  const onImpressionEnd = usePreservedCallback(_onImpressionEnd ?? noop);

  const isIntersectingRef = useRef(false);
  const setDebouncedIsImpressed = useSetDebouncedBooleanValue({
    onValueChange: isImpressed => {
      if (isImpressed) {
        onImpressionStart();
      } else {
        onImpressionEnd();
      }
    },
    timeThreshold,
  });

  const intersectionObserverRef = useIntersectionObserver<Element>(
    ({ isIntersecting }) => {
      if (document.visibilityState === 'hidden') {
        return;
      }

      isIntersectingRef.current = isIntersecting;
      setDebouncedIsImpressed(isIntersecting);
    },
    {
      rootMargin,
      threshold: intersectThreshold,
    }
  );

  useDocumentVisibilityChange(documentVisible => {
    if (!isIntersectingRef.current) {
      return;
    }

    setDebouncedIsImpressed(documentVisible);
  });

  return intersectionObserverRef;
}

function useDocumentVisibilityChange(_callback: (isVisible: boolean) => void) {
  const callback = usePreservedCallback(_callback);

  useEffect(() => {
    const handleVisibilityChange = () => {
      callback(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [callback]);
}

function useIntersectionObserver<Element extends HTMLElement>(
  _callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit
) {
  const callback = usePreservedCallback(_callback);
  const observer = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) {
        return;
      }

      callback(entry);
    }, options);

    return observer;
  }, [callback, options]);

  const ref = useRefEffect<Element>(
    element => {
      observer?.observe(element);

      return () => {
        observer?.unobserve(element);
      };
    },
    [callback, options]
  );

  return ref;
}

function useSetDebouncedBooleanValue(options: { onValueChange: (newValue: boolean) => void; timeThreshold: number }) {
  const { onValueChange, timeThreshold } = options;
  const handleValueChange = usePreservedCallback(onValueChange);
  const ref = useRef({ value: false, cancelPrevDebounce: () => { } });

  const setDebouncedValue = useCallback(
    (newValue: boolean) => {
      if (newValue === ref.current.value) {
        return;
      }

      const debounced = debounce(() => {
        handleValueChange(newValue);
        ref.current.value = newValue;
      }, timeThreshold);

      ref.current.cancelPrevDebounce();
      debounced();
      ref.current.cancelPrevDebounce = debounced.cancel;
    },
    [handleValueChange, timeThreshold]
  );

  useEffect(() => {
    const current = ref.current;
    return () => {
      current.cancelPrevDebounce();
    };
  }, []);

  return setDebouncedValue;
}
