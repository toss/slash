# @toss/sentry

브라우저와 Node.js 모두에서 사용할 수 있는 Sentry 모듈입니다.

## 사용 방법

```tsx
import { Sentry } from '@toss/sentry';

Sentry.init(...);
Sentry.captureException(...);
```

- 일반 React 앱: `@toss/sentry` 를 사용하세요.
- Next.js 앱: `@toss/sentry/nextjs`를 사용하세요.

<details>
  <summary><b>왜 일반 앱과 Next.js 앱을 구분해야 하나요?</b></summary>
  <br />
  <ul>
    <li>일반 서버의 `@sentry/node`는 에러를 그루핑할 때 요청 기준이 아닌 Node.js 프로세스 기준으로 그루핑합니다. (수동으로 [Sentry.Handlers.requestHandler()](https://docs.sentry.io/platforms/node/guides/express/)를 사용해야 함)</li>
    <li>`@sentry/nextjs`는 서버 에러를 그루핑할 때 Next.js로 들어온 요청을 기준으로 그루핑합니다.</li>
  </ul>
</details>

## 패키지의 목적

일반적으로 `@sentry/node`는 Node.js 서버를 위해 만들어져 있어서, 각종 Node.js API를 사용합니다. 반대로 `@sentry/browser`는 브라우저를 위해 만들어져 있어서, 각종 브라우저 API를 사용합니다.

제공하는 API의 모습은 같아도 내부 구현이 다르기 때문에, 각 플랫폼에 맞는 패키지를 사용해야 합니다.

`@toss/sentry`는 [Import conditions](https://nodejs.org/api/packages.html#community-conditions-definitions)를 이용하여 서버에서 사용하는 경우 서버용 `@sentry/node`, 브라우저에서 사용하는 경우 브라우저용 `@sentry/browser` 를 반환합니다. 그래서 import를 분기하지 않고도 쉽게 플랫폼에 맞는 Sentry를 사용할 수 있습니다.

## 추가 최적화: 브라우저의 경우

`@toss/sentry`를 브라우저에서 사용하는 경우 Sentry의 [Lazy-loading](https://docs.sentry.io/platforms/javascript/install/lazy-load-sentry/) 기능에 의존합니다.

Lazy loading 스크립트가 없는 곳에서 `@toss/sentry` 를 사용하게 되면 에러가 발생하므로, 반드시 스크립트를 추가해주시기 바랍니다.

토스코어의 경우 `@toss/twdk-next` 내부에 내장된 `<SentryScript />` 컴포넌트로 Lazy loading 스크립트를 포함하고 있습니다.

## 테스트하기

`@toss/sentry/testing` 모듈로 테스트할 수 있습니다.

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
