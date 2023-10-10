/** @tossdocs-ignore */
import { ComponentType } from 'react';
import { ErrorBoundaryGroup } from './ErrorBoundaryGroup';
import { ComponentPropsWithoutChildren } from './types';

export const withErrorBoundaryGroup = <Props extends Record<string, unknown> = Record<string, never>>(
  Component: ComponentType<Props>,
  errorBoundaryGroupProps?: ComponentPropsWithoutChildren<typeof ErrorBoundaryGroup>
) => {
  const Wrapped = (props: Props) => (
    <ErrorBoundaryGroup {...errorBoundaryGroupProps}>
      <Component {...props} />
    </ErrorBoundaryGroup>
  );

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component';
    Wrapped.displayName = `withErrorBoundaryGroup(${name})`;
  }

  return Wrapped;
};
