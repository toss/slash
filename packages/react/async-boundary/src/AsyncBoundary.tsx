/** @tossdocs-ignore */
import { ErrorBoundary } from '@toss/error-boundary';
import { ComponentProps, ComponentRef, forwardRef, Suspense } from 'react';

type ErrorBoundaryProps = Omit<ComponentProps<typeof ErrorBoundary>, 'renderFallback'>;
type SuspenseProps = Omit<ComponentProps<typeof Suspense>, 'fallback'>;

type Props = SuspenseProps &
  ErrorBoundaryProps & {
    rejectedFallback?: ComponentProps<typeof ErrorBoundary>['renderFallback'];
    pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  };

const AsyncBoundary = forwardRef<ComponentRef<typeof ErrorBoundary>, Props>(
  ({ pendingFallback, rejectedFallback, children, ...errorBoundaryProps }, resetRef) => (
    <ErrorBoundary ref={resetRef} renderFallback={rejectedFallback} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  )
);

export default AsyncBoundary;
