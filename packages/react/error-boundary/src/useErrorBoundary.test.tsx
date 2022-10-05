import { act, renderHook, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { ErrorBoundary } from '.';
import useErrorBoundary from './useErrorBoundary';

describe('useErrorBoundary', () => {
  it('반환되는 setError에 Error를 넘겨주면 throw 된다.', async () => {
    // Given
    const error = new Error('test');

    // When
    const { result } = renderHook(useErrorBoundary, {
      wrapper: ({ children }: { children?: ReactNode }) => {
        return (
          <ErrorBoundary
            renderFallback={({ error }) => {
              return <>{error.message}</>;
            }}
          >
            {children}
          </ErrorBoundary>
        );
      },
    });

    act(() => {
      result.current(error);
    });

    // Then
    expect(await screen.findByText('test')).toBeInTheDocument();
  });
});
