import { ComponentProps, ComponentType } from 'react';
import AsyncBoundary from './AsyncBoundary';

/**
 * @name withAsyncBoundary
 * @description
 * 주어진 컴포넌트를 `AsyncBoundary`로 감싸는 Higher-order component 입니다.
 * 자세한 사용법은 `AsyncBoundary` 에 대한 문서를 참조하세요.
 * ```typescript
 * const MyComponent = withAsyncBoundary(Suspense를_일으키는_컴포넌트, {
 *   // 로딩 중일 때 보여줄 컴포넌트
 *   pendingFallback: <div>로딩 중입니다.</div>,
 *   // 에러가 발생했을 때 보여줄 컴포넌트. 첫 번째 인자로는 발생한 에러가 전달됩니다.
 *   rejectedFallback: error => <div>에러가 발생했습니다. {error.message}</div>
 * })
 * ```
 * @see https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
 * @see https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
 */
export default function withAsyncBoundary<Props = {}>(
  WrappedComponent: ComponentType<Props>,
  asyncBoundaryProps: ComponentProps<typeof AsyncBoundary>
) {
  return (props: Props) => {
    return (
      <AsyncBoundary {...asyncBoundaryProps}>
        <WrappedComponent {...props} />
      </AsyncBoundary>
    );
  };
}
