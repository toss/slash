---
title: AsyncBoundaryProvider
---

# AsyncBoundaryProvider

With the `AsyncBoundary` component,
you can use the `AsyncBoundaryProvider` to perform an error reset, even if the part that performs the error reset is separated from the part that actually uses the Suspense + ErrorBoundary.
`AsyncBoundaryProvider` to perform the error reset, even if the part that performs the error reset is separated from the part that uses the actual Suspense + ErrorBoundary.

## Examples

```jsx
<AsyncBoundaryProvider>
  <DataController /*  <-- Where to reset an error */ />
  <Spacing size={40} />
  <AsyncBoundary /* <-- What should be enclosed by the suspense + error boundary */
    pendingFallback={<TableSkeleton title="Details" row={10} />}
    errorFallback={({ error, reset }) => (
      <ErrorAlert theme="yellow" error={error} message="Please try again." onResetError={reset} />
    )}
  >
    <DataViewer />
  </AsyncBoundary>
</AsyncBoundaryProvider>
```

## References

https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표
