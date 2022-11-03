---
title: Redirection
---

# Redirection

Redirection을 정의하는 프로토콜입니다.

함께 제공하는 RedirectionErrorBoundary, isRedirection type guard 등으로 받아서 사용할 수 있습니다.

React에서는 RedirectionBoundary를 사용하여 더 쉽게 사용할 수 있습니다.

```ts
throw Redirection.of({ destination: '/issue/introduction/under-fourteen' });
```

## Examples

```ts
function fetchU18User() {
  const { type } = fetchUser();

  if (type >= 19) {
    // catch this in getInitialProps or etc
    throw Redirection.of({ destination: '/introduction/adult' });
  }

  return user;
}
```
