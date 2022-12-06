import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('can catch errors in children', () => {
    function TestComponent(): JSX.Element {
      throw new Error(`This is an error`);
    }

    render(
      <ErrorBoundary
        renderFallback={({ error }) => {
          return <div>An error occurred: {error.message}</div>;
        }}
      >
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(`An error occurred: This is an error`)).toBeInTheDocument();
  });
});
