/** @tossdocs-ignore */
import { ComponentProps, Suspense, useCallback, useRef, useState } from 'react';
import { SSRSuspenseTimeoutOptions, TimeoutWrapper } from './TimeoutWrapper';
import { useImpression } from './useImpression';
import useIsMounted from './useIsMounted';

interface Props extends ComponentProps<typeof Suspense> {
  transition?: boolean;
  timeoutOptions?: SSRSuspenseTimeoutOptions;
}

/**
 * @name SSRSuspense
 * @desc
 * SSR-safe한 react suspense 컴포넌트입니다.
 *
 * ```typescript
 * function SSRSuspense({
 * // promise pending 상태에서 랜더링될 fallback 컴포넌트입니다
 * fallback,
 * // (⚠️ 시험중입니다! 아직 사용하지 말아주세요) children에게 fade in 트랜지션을 줍니다.
 * // default false
 * transition,
 * // 이 옵션을 전달하면 fallback이 timeout 이상 랜더링 되면 onTimeout을 호출합니다.
 * timeoutOptions,
 * // promise resolve 이후 렌더될 컴포넌트입니다.
 * children,
 * }):
 * ```
 */
export default function SSRSuspense({ fallback, transition = false, children, timeoutOptions }: Props) {
  const isMounted = useIsMounted();

  if (isMounted) {
    return (
      <Suspense
        fallback={timeoutOptions ? <TimeoutWrapper fallback={fallback} timeoutOptions={timeoutOptions} /> : fallback}
      >
        {transition ? <SmoothAppear>{children}</SmoothAppear> : children}
      </Suspense>
    );
  }
  return <>{fallback}</>;
}

// TODO: 현재는 contents fade in만 지원. 추후에는 fallback과 contents를 겹쳐뒀다가 fade in and out
const SmoothAppear = ({ children }: { children: React.ReactNode }) => {
  const [rendered, setRendered] = useState(false);
  const targetRef = useRef(null);
  /**
   * legacy lifecycle이슈로 suspense에서 useEffect가 render전에 불립니다. 우회하기 위해 intersectionObserver를 사용하여 실제 render시점에 애니메이션을 시작합니다.
   * https://tossteam.slack.com/archives/C83Q0T5U1/p1628477941393400
   */
  const onImpressionStart = useCallback(() => setRendered(true), []);
  useImpression({ targetRef, onImpressionStart });

  return (
    <div
      className="suspensed-children"
      ref={targetRef}
      style={{ willChange: 'opacity', transition: 'opacity 200ms ease', opacity: rendered ? 1 : 0 }}
    >
      {children}
    </div>
  );
};
