/** @tossdocs-ignore */
import { useCallback, useEffect } from 'react';

export const useImpression = ({
  targetRef,
  onImpressionStart,
}: {
  targetRef: React.RefObject<HTMLDivElement>;
  onImpressionStart(): void;
}) => {
  const handleImpression = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry?.isIntersecting) {
        onImpressionStart();
      }
    },
    [onImpressionStart]
  );
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }
    const currentTarget = targetRef.current;
    if (currentTarget == null) {
      return;
    }

    const observer = new IntersectionObserver(handleImpression, {
      rootMargin: '0px',
      threshold: 0,
    });

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [targetRef, onImpressionStart, handleImpression]);
};
