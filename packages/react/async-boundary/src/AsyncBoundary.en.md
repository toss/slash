---
title: AsyncBoundary
---

# AsyncBoundary

This component handles the loading state of the asynchronous `Suspense` component and the `Error` state simultaneously.
The `Error` state can be initialized with the `reset()` function provided by `ref`.

## Examples

```jsx
const ref = useRef<{ reset: () => void }>();

<AsyncBoundary
  ref={ref}
  // Components to render when loading (when the Suspense state occurs)
  pendingFallback={<div>Loading.</div>}
  // The component to render when an error occurs. The first argument is passed the error that occurred.
  rejectedFallback={error => <div>An error occurred. {error.message}</div>}
>
  <Suspense_Creating_Components />
</AsyncBoundary>;

// Clearing an error caught by an AsyncBoundary
ref.current?.reset();
```

## References

https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
