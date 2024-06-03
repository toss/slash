/** @tossdocs-ignore */
import { assert } from '@toss/assert';
import { ErrorBoundary } from '@toss/error-boundary';
import { ReactNode } from 'react';
import { isRedirection, Redirection } from '../model/Redirection';

export function RedirectionBoundary({
  children,
  onRedirect,
}: {
  children: ReactNode;
  onRedirect?: (r: Redirection) => void;
}) {
  return (
    <ErrorBoundary
      ignoreError={e => !isRedirection(e)}
      onError={async redirection => {
        assert(isRedirection(redirection));

        if (typeof onRedirect !== 'function') {
          console.debug('onRedirect is not defined');
          return;
        }

        onRedirect(redirection);
      }}
      renderFallback={() => null}
    >
      {children}
    </ErrorBoundary>
  );
}
