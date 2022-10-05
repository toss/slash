/** @tossdocs-ignore */
import sentryTestkit from 'sentry-testkit';

const { testkit, sentryTransport: mockSentryTransport } = sentryTestkit();

export function useFakeSentry() {
  jest.mock('@sentry/node', () => {
    const Sentry = jest.requireActual('@sentry/node');

    return {
      ...Sentry,
      init: (options: any) => {
        console.log('node', options);
        Sentry.init(Object.assign({}, options, { transport: mockSentryTransport }));
      },
    };
  });

  jest.mock('@sentry/browser', () => {
    const Sentry = jest.requireActual('@sentry/browser');

    return {
      ...Sentry,
      init: (options: any) => {
        console.log('browser', options);

        Sentry.init(Object.assign({}, options, { transport: mockSentryTransport }));
      },
    };
  });
}

export { testkit as sentryServer };
