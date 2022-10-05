/** @tossdocs-ignore */
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState, forwardRef, Ref } from 'react';
import useCombinedRefs from './useCombinedRefs';

interface Props {
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  rootMargin?: string;
  /**
   * 몇 퍼센트 이상 화면에 표시되면 "보인다"고 생각할지 결정합니다.
   * 예를 들어, 0.5가 주어지면 0.5 이상이 보여졌을 때 `onImpressionStart`, 이하가 보여졌을 때 `onImpressionEnd`가 호출됩니다.
   * @default 0
   */
  areaThreshold?: number;
  /**
   * 몇 밀리세컨드 이상 화면에 표시되거나 사라져야 실제로 값을 업데이트할지 결정합니다.
   * 예를 들어, 값이 2000이면 2초 사이에 요소의 표시 상태가 바뀌어도 첫 상태와 끝 상태가 같다면 이벤트가 호출되지 않습니다.
   * @default 0
   */
  timeThreshold?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  role?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean | 'false' | 'true';
}

const ImpressionArea = forwardRef(
  (
    {
      rootMargin,
      areaThreshold,
      timeThreshold,
      className,
      children,
      onImpressionStart,
      onImpressionEnd,
      style,
      ...otherProps
    }: Props,
    forwardedRef: Ref<HTMLDivElement>
  ) => {
    const impressionRef = useImpressionRef<HTMLDivElement>({
      onImpressionStart,
      onImpressionEnd,
      areaThreshold,
      timeThreshold,
      rootMargin,
    });

    const ref = useCombinedRefs(forwardedRef, impressionRef);

    return (
      <div className={className} ref={ref} style={style} {...otherProps}>
        {children}
      </div>
    );
  }
);

export default ImpressionArea;

function useImpressionRef<Element extends HTMLElement>({
  onImpressionStart,
  onImpressionEnd,
  timeThreshold = 0,
  rootMargin = '-8px',
  areaThreshold: impressionRatio = 0,
}: Pick<Props, 'rootMargin' | 'onImpressionStart' | 'onImpressionEnd' | 'timeThreshold' | 'areaThreshold'>) {
  const [isImpressed, setIsImpressed] = useState(false);

  const handleImpressionStart = useDebouncedCallback(
    () => {
      if (!isImpressed) {
        if (onImpressionStart !== undefined) {
          onImpressionStart();
        }
        setIsImpressed(true);
      }
    },
    timeThreshold,
    [isImpressed, setIsImpressed, onImpressionStart]
  );

  const handleImpressionEnd = useDebouncedCallback(
    () => {
      if (isImpressed) {
        if (onImpressionEnd !== undefined) {
          onImpressionEnd();
        }
        setIsImpressed(false);
      }
    },
    timeThreshold,
    [isImpressed, setIsImpressed, onImpressionEnd]
  );

  const handleImpression = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0]!;
      const currentRatio = entry.intersectionRatio;

      const didImpressionEnd = impressionRatio === 0 ? !entry.isIntersecting : currentRatio < impressionRatio;

      if (didImpressionEnd) {
        handleImpressionStart.cancel();
        handleImpressionEnd();
      } else {
        handleImpressionEnd.cancel();
        handleImpressionStart();
      }
    },
    [handleImpressionEnd, handleImpressionStart, impressionRatio]
  );

  const observer = useMemo(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    return new IntersectionObserver(handleImpression, {
      rootMargin,
      threshold: impressionRatio,
    });
  }, [handleImpression, impressionRatio, rootMargin]);

  const ref = useCallback(
    (element: Element | null) => {
      if (observer === undefined) {
        return;
      }

      observer.disconnect();
      // unmount시 ref callback에는 null이 넘어옴
      if (element !== null) {
        observer.observe(element);
      }
    },
    [observer]
  );

  return ref;
}

function useDebouncedCallback<Func extends (...args: any[]) => any>(func: Func, delay: number, deps: any[] = []) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => debounce(func, delay), [delay, ...deps]);
}
