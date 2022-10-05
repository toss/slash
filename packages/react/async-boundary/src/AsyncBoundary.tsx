import { ErrorBoundary } from '@tossteam/error-boundary';
import { SSRSuspense } from '@tossteam/ssr-suspense';
import { ComponentProps, forwardRef, Ref, useImperativeHandle, useRef } from 'react';

type ErrorBoundaryProps = Omit<ComponentProps<typeof ErrorBoundary>, 'renderFallback'>;
type SSRSuspenseProps = Omit<ComponentProps<typeof SSRSuspense>, 'fallback'>;

type Props = SSRSuspenseProps &
  ErrorBoundaryProps & {
    rejectedFallback: ComponentProps<typeof ErrorBoundary>['renderFallback'];
    pendingFallback: ComponentProps<typeof SSRSuspense>['fallback'];
  };

interface ResetRef {
  reset?(): void;
}

/**
 * @name AsyncBoundary
 * @description
 * 비동기 `Suspense` 컴포넌트의 로딩 상태와 `Error` 상태를 동시에 처리하는 컴포넌트입니다.
 * `ref` 가 제공하는 `reset()` 함수로 `Error` 상태를 초기화할 수 있습니다.
 * ```typescript
 * const ref = useRef<{ reset: () => void }>();
 *
 * <AsyncBoundary
 *   ref={ref}
 *   // 로딩 중일 때 (Suspense 상태가 발생했을 때) 렌더할 컴포넌트
 *   pendingFallback={<div>로딩 중입니다.</div>}
 *   // 에러가 발생했을 때 렌더할 컴포넌트. 첫 번째 인자로는 발생한 에러가 전달됩니다.
 *   rejectedFallback={(error) => <div>에러가 발생했습니다. {error.message}</div>}
 * >
 *   <Suspense_일으키는_컴포넌트 />
 * </AsyncBoundary>
 *
 * // AsyncBoundary가 catch한 에러를 clear하기
 * ref.current?.reset();
 * ```
 * @see https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
 * @see https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
 */
const AsyncBoundary = forwardRef(function (
  { pendingFallback, rejectedFallback, children, transition, timeoutOptions, ...errorBoundaryProps }: Props,
  resetRef: Ref<ResetRef>
) {
  const ref = useRef<ErrorBoundary | null>(null);

  useImperativeHandle(resetRef, () => ({
    reset: () => ref.current?.resetErrorBoundary(),
  }));

  return (
    <ErrorBoundary ref={ref} renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <SSRSuspense transition={transition} timeoutOptions={timeoutOptions} fallback={pendingFallback}>
        {children}
      </SSRSuspense>
    </ErrorBoundary>
  );
});

export default AsyncBoundary;
