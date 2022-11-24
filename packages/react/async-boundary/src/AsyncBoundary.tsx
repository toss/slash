/** @tossdocs-ignore */
import { BaseErrorBoundary, ErrorBoundary } from '@toss/error-boundary';
import { ComponentProps, forwardRef, Ref, Suspense, useImperativeHandle, useRef } from 'react';

type ErrorBoundaryProps = Omit<ComponentProps<typeof ErrorBoundary>, 'renderFallback'>;
type SuspenseProps = Omit<ComponentProps<typeof Suspense>, 'fallback'>;

type Props = SuspenseProps &
  ErrorBoundaryProps & {
    rejectedFallback: ComponentProps<typeof ErrorBoundary>['renderFallback'];
    pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  };

interface ResetRef {
  reset?(): void;
}

const AsyncBoundary = forwardRef(function (
  { pendingFallback, rejectedFallback, children, ...errorBoundaryProps }: Props,
  resetRef: Ref<ResetRef>
) {
  const ref = useRef<BaseErrorBoundary | null>(null);

  useImperativeHandle(resetRef, () => ({
    reset: () => ref.current?.resetErrorBoundary(),
  }));

  return (
    <ErrorBoundary ref={ref} renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
});

export default AsyncBoundary;
