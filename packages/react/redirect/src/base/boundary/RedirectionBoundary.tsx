import { assert } from '@tossteam/assert';
import { ErrorBoundary } from '@tossteam/error-boundary';
import { ReactNode } from 'react';
import { isRedirection, Redirection } from '../model/Redirection';

/**
 * @name RedirectionBoundary
 * @description
 * 문서화가 필요합니다.
 */
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
