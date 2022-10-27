---
title: AsyncBoundaryProvider
---

# AsyncBoundaryProvider

`AsyncBoundary` 컴포넌트를 사용하면,
Error Reset를 하는 부분과 실제 Suspense + ErrorBoundary를 사용하는 부분이 떨어져 있어도
`AsyncBoundaryProvider` 를 이용하여 Error Reset을 할 수 있습니다.

## References

https://jbee.io/react/error-declarative-handling-1/ 선언적으로 로딩과 에러 상태 처리하기
https://toss.im/slash-21/sessions/3-1 Suspense와 에러 처리 관련된 Slash 21 발표

## Examples

```jsx
<AsyncBoundaryProvider>
  <DataController /*  <-- error reset 해야 하는 부분 */ />
  <Spacing size={40} />
  <AsyncBoundary /* <-- suspense + error boundary로 감싸져야 하는 부분 */
    pendingFallback={<TableSkeleton title="상세내역" row={10} />}
    errorFallback={({ error, reset }) => (
      <ErrorAlert theme="yellow" error={error} message="다시 시도해주세요." onResetError={reset} />
    )}
  >
    <DataViewer />
  </AsyncBoundary>
</AsyncBoundaryProvider>
```
