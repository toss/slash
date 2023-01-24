/** @tossdocs-ignore */
import { ComponentProps, ComponentType } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function withErrorBoundary<Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  errorBoundaryProps: ComponentProps<typeof ErrorBoundary>
) {
  const Wrapped = (props: Props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Unknown';
    Wrapped.displayName = `withErrorBoundary(${name})`;
  }

  return Wrapped;
}
