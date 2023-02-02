import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorBoundaryGroup, useErrorBoundaryGroup } from './ErrorBoundaryGroup';

describe('ErrorBoundaryGroup', () => {
  it('can reset errors in the group', async () => {
    const state = { hasError: true };

    function ErrorComponent() {
      if (state.hasError) {
        throw new Error(`This is an error`);
      }

      return <div>It succeeded!</div>;
    }

    function ResetComponent() {
      const group = useErrorBoundaryGroup();

      return (
        <button
          onClick={() => {
            state.hasError = false;
            group.reset();
          }}
        >
          Reset
        </button>
      );
    }

    render(
      <ErrorBoundaryGroup>
        <ErrorBoundary
          renderFallback={({ error }) => {
            return <div>An error occurred: {error.message}</div>;
          }}
        >
          <ErrorComponent />
        </ErrorBoundary>
        <ResetComponent />
      </ErrorBoundaryGroup>
    );

    expect(screen.getByText(`An error occurred: This is an error`)).toBeInTheDocument();

    const user = await userEvent.setup();

    await user.click(screen.getByRole('button', { name: `Reset` }));

    expect(screen.getByText(`It succeeded!`)).toBeInTheDocument();
  });
});

describe('useErrorBoundaryGroup', () => {
  it("useErrorBoundaryGroup's returning object is same with object returned in previous render", () => {
    const { result, rerender } = renderHook(useErrorBoundaryGroup, {
      wrapper: ({ children }) => <ErrorBoundaryGroup>{children}</ErrorBoundaryGroup>,
    });

    const prev = result.current;
    rerender();
    const next = result.current;

    expect(prev).toBe(next);
  });
});
