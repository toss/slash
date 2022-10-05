/** @tossdocs-ignore */
import { renderHook } from '@testing-library/react';
import { Suspense } from 'react';

// ts-prune-ignore-next
export function renderWithSuspense(render: any, params: any = {}) {
  const isSuspended = jest.fn(() => null);

  const FallbackComponent = () => {
    isSuspended();
    return null;
  };

  const controls = renderHook(render, {
    ...params,
    wrapper: ({ children }) => {
      return <Suspense fallback={<FallbackComponent />}>{children}</Suspense>;
    },
  });

  return {
    ...controls,
    checkDidSuspend: () => {
      return isSuspended.mock.calls.length > 0;
    },
  };
}
