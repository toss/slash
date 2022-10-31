---
title: AsyncBoundary
---

# AsyncBoundary

비동기 `Suspense` 컴포넌트의 로딩 상태와 `Error` 상태를 동시에 처리하는 컴포넌트입니다.
`ref` 가 제공하는 `reset()` 함수로 `Error` 상태를 초기화할 수 있습니다.

## Examples

```jsx
const ref = useRef<{ reset: () => void }>();

<AsyncBoundary
  ref={ref}
  // 로딩 중일 때 (Suspense 상태가 발생했을 때) 렌더할 컴포넌트
  pendingFallback={<div>로딩 중입니다.</div>}
  // 에러가 발생했을 때 렌더할 컴포넌트. 첫 번째 인자로는 발생한 에러가 전달됩니다.
  rejectedFallback={error => <div>에러가 발생했습니다. {error.message}</div>}
>
  <Suspense_일으키는_컴포넌트 />
</AsyncBoundary>;

// AsyncBoundary가 catch한 에러를 clear하기
ref.current?.reset();
```

## References

https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
