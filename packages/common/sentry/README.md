# @toss/sentry

A Sentry module that can be used in both the browser and Node.js.

## Usage

```tsx
import { Sentry } from '@toss/sentry';

Sentry.init(...);
Sentry.captureException(...);
```

- Normal React app: Use `@toss/sentry`.
- Next.js app: Use `@toss/sentry/nextjs`.

<details>
  <summary><b>Why do I need to distinguish between regular apps and Next.js apps?</b></summary>
  <br />
  <ul>
    <li>On a normal server, `@sentry/node` will group errors by Node.js process, not by request. (You will need to manually use <a href="https://docs.sentry.io/platforms/node/guides/express/">Sentry.Handlers.requestHandler</a>)</li>
    <li>When grouping server errors, `@sentry/nextjs` groups them by the request that came into Next.js.</li>
  </ul>
</details>

## Purpose of the package

Generally speaking, `@sentry/node` is created for Node.js servers and uses various Node.js APIs. In contrast, `@sentry/browser` is built for browsers and uses various browser APIs.

While the APIs look the same, the internal implementation is different, so you'll need to use the appropriate package for each platform.

Using [Import conditions](https://nodejs.org/api/packages.html#community-conditions-definitions), `@toss/sentry` will return `@sentry/node` for the server if used on the server, or `@sentry/browser` for the browser if used on the browser. This makes it easy to use platform-specific Sentry without having to branch the import.

## Additional optimizations: For browsers

When using `@toss/sentry` in a browser, it relies on Sentry's [Lazy-loading](https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/) feature.

If you use `@toss/sentry` where there is no lazy loading script, you will get an error, so be sure to add one.

## Testing

You can test with the `@toss/sentry/testing` module.

```tsx
import Sentry from '@toss/sentry';
import { useFakeSentry } from '@toss/sentry/testing';
import waitFor from 'wait-for-expect';

beforeAll(() => {
  useFakeSentry();
});

describe('Sentry는', () => {
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
```
