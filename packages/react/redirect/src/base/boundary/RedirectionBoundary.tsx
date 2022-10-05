import { assert } from '@tossteam/assert';
import { ErrorBoundary } from '@tossteam/error-boundary';
import { ReactNode } from 'react';
import { BaseRedirectionOptions, isRedirection, Redirection } from '../model/Redirection';

/**
 * @name RedirectionBoundary
 * @description
 * 문서화가 필요합니다.
 */
export function RedirectionBoundary({
  children,
  onRedirect,
  onRedirectFallback,
}: {
  children: ReactNode;
  onRedirect?: (r: Redirection) => void;
  onRedirectFallback?: (options: BaseRedirectionOptions) => void;
}) {
  return (
    <ErrorBoundary
      ignoreError={e => !isRedirection(e)}
      onError={async redirection => {
        assert(isRedirection(redirection));

        if (onRedirect) {
          onRedirect(redirection);
          return;
        }

        try {
          await redirection.redirect();
        } catch (e: any) {
          if (onRedirectFallback == null) {
            console.warn(e);
            return;
          }
          onRedirectFallback?.(redirection.options);
        }
      }}
      renderFallback={() => null}
    >
      {children}
    </ErrorBoundary>
  );
}
