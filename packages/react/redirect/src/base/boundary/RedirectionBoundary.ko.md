---
title: RedirectionBoundary
---

# RedirectionBoundary

Redirection 예외를 처리하는 컴포넌트입니다.
`RedirectionBoundary` 컴포넌트는 children 발생하는 `Redirection` 예외를 캡처하고, 특정 경로(route)로의 redirection 을 처리합니다.

`RedirectionBoundary` 컴포넌트를 사용함으로써, redirection 로직을 컴포넌트 트리 내에서 선언적으로 관리할 수 있게 됩니다.

## Example

```jsx
const Example = () => {
  if (!isLoggedIn) {
    throw Redirection.of({ destination: 'login' });
  }
  return <></>;
};

export const Component = () => {
  return (
    <RedirectionBoundary
      onRedirect={redirection => {
        window.location.href = redirection.options.destination;
      }}
    >
      <Example />
    </RedirectionBoundary>
  );
};
```
