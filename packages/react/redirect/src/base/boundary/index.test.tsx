import { render, waitFor } from '@testing-library/react';
import { ErrorBoundary } from '@toss/error-boundary';
import { Redirection } from '..';
import { RedirectionBoundary } from './index';

describe('RedirectionBoundary', () => {
  beforeEach(() => jest.resetAllMocks());

  it(`throw 된 것이 없으면 children을 렌더한다`, () => {
    const result = render(
      <RedirectionBoundary>
        <Throwable />
      </RedirectionBoundary>
    );

    expect(result.getByText('Rendered')).toBeInTheDocument();
  });

  it(`throw 된 것이 Redirection이 아니면 ignore 한다`, () => {
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

  it(`throw 된 RedirectionBoundary에 onRedirect 값이 있으면 호출한다`, () => {
    const onRedirect = jest.fn(() => null);
    const onRedirectBoundary = jest.fn(() => null);

    render(
      <RedirectionBoundary onRedirect={onRedirectBoundary}>
        <Throwable error={Redirection.of({ destination: '/unicorn-land', onRedirect })} />
      </RedirectionBoundary>
    );

    expect(onRedirect).not.toBeCalled();
    expect(onRedirectBoundary).toBeCalled();
  });

  it(`throw 된 RedirectionBoundary에 onRedirect 값이 없으면 throw 된 Redirection의 onRedirect를 호출한다`, async () => {
    const onRedirect = jest.fn(() => null);

    render(
      <RedirectionBoundary>
        <Throwable error={Redirection.of({ destination: '/unicorn-land', onRedirect })} />
      </RedirectionBoundary>
    );

    waitFor(() => expect(onRedirect).toBeCalled());
  });

  it(`throw 된 RedirectionBoundary에 onRedirect 값이 없고 throw 된 Redirection의 onRedirect도 없으면 onRedirectFallback을 호출한다`, async () => {
    const onRedirectFallback = jest.fn(() => null);

    render(
      <RedirectionBoundary onRedirectFallback={onRedirectFallback}>
        <Throwable error={Redirection.of({ destination: '/unicorn-land' })} />
      </RedirectionBoundary>
    );

    await waitFor(() => expect(onRedirectFallback).toBeCalled());
  });
});

function Throwable({ error }: { error?: Error }) {
  if (error) {
    throw error;
  }

  return <>Rendered</>;
}
