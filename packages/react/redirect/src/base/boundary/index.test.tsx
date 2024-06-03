import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from '@toss/error-boundary';
import { Redirection } from '..';
import { RedirectionBoundary } from './index';

describe('RedirectionBoundary', () => {
  beforeEach(() => jest.resetAllMocks());

  it('should render children if no error is thrown', () => {
    const result = render(
      <RedirectionBoundary>
        <Throwable />
      </RedirectionBoundary>
    );

    expect(result.getByText('Rendered')).toBeInTheDocument();
  });

  it('should ignore errors that are not of type Redirection', () => {
    const renderFallback = jest.fn(() => null);

    render(
      <ErrorBoundary renderFallback={renderFallback}>
        <RedirectionBoundary>
          <Throwable error={new Error()} />
        </RedirectionBoundary>
      </ErrorBoundary>
    );

    expect(renderFallback).toBeCalled();
  });

  it('should call the provided onRedirect when a Redirection error is thrown', () => {
    const onRedirect = jest.fn(() => null);
    const onRedirectBoundary = jest.fn(() => null);

    render(
      <RedirectionBoundary onRedirect={onRedirectBoundary}>
        <Throwable error={Redirection.of({ destination: '/unicorn-land' })} />
      </RedirectionBoundary>
    );

    expect(onRedirect).not.toBeCalled();
    expect(onRedirectBoundary).toBeCalled();
  });

  it('should call the Redirections onRedirect when no onRedirect prop is provided to RedirectionBoundary', async () => {
    const onRedirect = jest.fn(() => null);

    render(
      <RedirectionBoundary onRedirect={onRedirect}>
        <Throwable error={Redirection.of({ destination: '/unicorn-land' })} />
      </RedirectionBoundary>
    );

    waitFor(() => expect(onRedirect).toBeCalled());
  });

  it('should call onRedirect when no onRedirect prop is provided, and the thrown Redirection error does not have an onRedirect method', async () => {
    const onRedirect = jest.fn(() => null);

    render(
      <RedirectionBoundary onRedirect={onRedirect}>
        <Throwable error={Redirection.of({ destination: '/unicorn-land' })} />
      </RedirectionBoundary>
    );

    await waitFor(() => expect(onRedirect).toBeCalled());
  });
});

function Throwable({ error }: { error?: Error }) {
  if (error) {
    throw error;
  }

  return <>Rendered</>;
}
