import { sentryServer } from './testing';
import { Sentry } from './index.node';
import { FAKE_DSN } from './testing/constants';
import waitFor from 'wait-for-expect';

describe('Isomorphic Sentry - node', () => {
  beforeEach(() => {
    Sentry.init({
      dsn: FAKE_DSN,
    });
  });

  it('captureException할 수 있다.', async () => {
    await Sentry.captureException(new Error('hello'));

    await waitFor(() => {
      expect(sentryServer.reports()).toHaveLength(1);
    });
  });
});
