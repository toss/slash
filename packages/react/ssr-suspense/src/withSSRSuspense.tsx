/** @tossdocs-ignore */
import { ComponentType, ReactNode } from 'react';
import SSRSuspense from './SSRSuspense';
import { SSRSuspenseTimeoutOptions } from './TimeoutWrapper';

/**
 * @name withSSRSuspense
 * @description
 * 컴포넌트를 SSRSuspense로 감싸는 HOC함수입니다.
 *
 * ```typescript
 * function withSSRSuspense<Props = {}>(
 * // SSRSuspense로 감쌀 컴포넌트입니다.
 * WrappedComponent: ComponentType<Props>,
 * options?: {
 *   // Suspense시 렌더할 fallback 컴포넌트입니다.
 *   fallback: NonNullable<ReactNode> | null;
 *   // SSRSuspense에서 사용될 timeout option입니다.
 *   timeoutOptions?: SSRSuspenseTimeoutOptions;
 * })
 * ```
 *
 * @example
 * ```typescript
 *   const MyComponent = () => {
 *     return <div>hi</div>
 *   }
 *
 *   export withSSRSuspense(MyComponent, {
 *     fallback: <div>loading...</div>,
 *    timeoutOptions: {
 *      timeout: 1000;
 *      onTimeout: () => console.log('timeout!');
 *   })
 * ```
 */
export default function withSSRSuspense<Props = {}>(
  WrappedComponent: ComponentType<Props>,
  options: { fallback: NonNullable<ReactNode> | null; timeoutOptions?: SSRSuspenseTimeoutOptions }
) {
  return function WithSSRSuspense(props: Props) {
    return (
      <SSRSuspense fallback={options.fallback} timeoutOptions={options.timeoutOptions}>
        <WrappedComponent {...(props as any)} />
      </SSRSuspense>
    );
  };
}
