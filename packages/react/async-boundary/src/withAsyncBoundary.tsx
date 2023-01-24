/** @tossdocs-ignore */
import { ComponentProps, ComponentType } from 'react';
import AsyncBoundary from './AsyncBoundary';

export default function withAsyncBoundary<Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  asyncBoundaryProps: ComponentProps<typeof AsyncBoundary>
) {
  const Wrapped = (props: Props) => (
    <AsyncBoundary {...asyncBoundaryProps}>
      <Component {...props} />
    </AsyncBoundary>
  );

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component';
    Wrapped.displayName = `withAsyncBoundary(${name})`;
  }

  return Wrapped;
}
