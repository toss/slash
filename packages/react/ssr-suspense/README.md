# @tossteam/ssr-suspense

SSR 환경에서는 suspense를 사용하면 에러가 발생합니다.  
@tossteam/ssr-suspense는 SSR 환경에서도 suspense를 사용할 수 있게 도와주는 라이브러리입니다.

## 설치

```shell
yarn add @tossteam/ssr-suspense
```

## SSRSuspense

CSR 일 때는 일반 suspense처럼 사용됩니다.  
SSR 일 때는 항상 fallback을 그리는 역할을 합니다.

| props          | 설명                                                        | 필수 여부 |
| -------------- | ----------------------------------------------------------- | --------- |
| fallback       | fallback                                                    | o         |
| transition     | children에게 fade in 트랜지션을 줍니다.                     | x         |
| timeoutOptions | fallback이 timeout 이상 랜더링 되면 onTimeout을 호출합니다. | x         |

```tsx
// e.g.
import { SSRSuspense } from '@tossteam/ssr-suspense';

export default function Page() {
  return (
    <SSRSuspense
      fallback={<></>}
      transition={true}
      timeoutOptions={{ timeout: 100, onTimeout: ({ timeout }) => console.log(timeout) }}
    >
      <Page />
    </SSRSuspense>
  );
}
```

## withSSRSuspense

SSRSuspense를 함수화하여 사용합니다.

| option         | 설명                                                        | 필수 여부 |
| -------------- | ----------------------------------------------------------- | --------- |
| fallback       | fallback                                                    | o         |
| timeoutOptions | fallback이 timeout 이상 랜더링 되면 onTimeout을 호출합니다. | x         |

```tsx
// e.g.
import { withSSRSuspense } from '@tossteam/ssr-suspense';

function Page() {
  return <Componenet />;
}

export default withSSRSuspense(<Page />, {
  fallback: <Loading />,
  timeoutOptions: {
    timeout: 100,
    onTimeout: ({ timeout }) => {
      console.log(timeout);
    },
  },
});
```
