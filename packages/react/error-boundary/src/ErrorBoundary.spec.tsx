import { act, render, renderHook, screen } from '@testing-library/react';
import { ComponentRef, createRef } from 'react';
import { ErrorBoundary, useErrorBoundary, useErrorBoundaryContext } from './ErrorBoundary';

const TEXT_ERROR = `This is an error`;
const TEXT_NO_ERROR = `This is no error`;
const RESET_MESSAGE = 'Retry';

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

  it('can catch erros in children with custom fallback, without renderFallback prop.', () => {
    const ErrorComponent = (): JSX.Element => {
      throw new Error(TEXT_ERROR);
    };

    const CustomFallback = ({ children }: { children: JSX.Element }): JSX.Element => {
      const { error, reset } = useErrorBoundaryContext();

      if (error != null) {
        return (
          <button type="button" onClick={() => reset()}>
            {RESET_MESSAGE}
          </button>
        );
      }
      return children;
    };

    render(
      <ErrorBoundary>
        <CustomFallback>
          <ErrorComponent />
        </CustomFallback>
      </ErrorBoundary>
    );

    expect(screen.getByText(RESET_MESSAGE)).toBeInTheDocument();
  });

  it('render renderFallback if both renderFallback and customFallback are provided', () => {
    const ErrorComponent = (): JSX.Element => {
      throw new Error(TEXT_ERROR);
    };

    const CustomFallback = ({ children }: { children: JSX.Element }): JSX.Element => {
      const { error } = useErrorBoundaryContext();

      if (error != null) {
        return <div>{RESET_MESSAGE}</div>;
      }

      return <div>{children}</div>;
    };

    render(
      <ErrorBoundary renderFallback={({ error }) => <div>{error.message}</div>}>
        <CustomFallback>
          <ErrorComponent />
        </CustomFallback>
      </ErrorBoundary>
    );

    expect(screen.getByText(TEXT_ERROR)).toBeInTheDocument();
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
  it('if function returned by this hook is called with Error as argument, Error will be thrown', async () => {
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
