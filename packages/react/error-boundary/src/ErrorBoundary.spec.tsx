import { act, render, renderHook, screen } from '@testing-library/react';
import { ComponentRef, createRef } from 'react';
import { ErrorBoundary, useErrorBoundary } from './ErrorBoundary';

const TEXT_ERROR = `This is an error`;
const TEXT_NO_ERROR = `This is no error`;

describe('ErrorBoundary', () => {
  it('can catch errors in children', () => {
    const ErrorComponent = (): JSX.Element => {
      throw new Error(TEXT_ERROR);
    };

    render(
      <ErrorBoundary renderFallback={({ error }) => <div>{error.message}</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(`${TEXT_ERROR}`)).toBeInTheDocument();
  });

  it('can be reset by ref.current.reset', () => {
    let isError = true;
    const ref = createRef<ComponentRef<typeof ErrorBoundary>>();

    const ErrorComponent = () => {
      if (isError) {
        throw new Error(TEXT_ERROR);
      }

      return <>{TEXT_NO_ERROR}</>;
    };

    render(
      <ErrorBoundary ref={ref} renderFallback={({ error }) => <div>An error occurred: {error.message}</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    act(() => {
      isError = false;
      ref.current?.reset();
    });

    expect(screen.getByText(TEXT_NO_ERROR)).toBeInTheDocument();
  });
});

describe('useErrorBoundary', () => {
  it('반환되는 setError에 Error를 넘겨주면 throw 된다.', async () => {
    // Given
    const error = new Error('test');

    // When
    const { result } = renderHook(useErrorBoundary, {
      wrapper: ({ children }) => {
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
