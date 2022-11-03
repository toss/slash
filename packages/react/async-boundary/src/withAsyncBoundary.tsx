/** @tossdocs-ignore */
import { ComponentProps, ComponentType } from 'react';
import AsyncBoundary from './AsyncBoundary';

export default function withAsyncBoundary<Props extends Record<string, unknown> = Record<string, never>>(
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
