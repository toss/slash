# useErrorBoundary

가장 가까운 `ErrorBoundary` 에 에러를 전달하기 위해 사용하는 Hook 입니다.
리액트에서 제공해주는 [`ErrorBoundary`](https://ko.reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper)는 랜더링 및 `useEffect` 의 콜백함수 내에서 오류가 발생했을때에만 에러를 인지합니다.
`useErrorBoundary`를 사용하여 다른 경우에 발생한 에러를 ErrorBoundary에게 전달해줄 수 있습니다.

```typescript
const throwError = useErrorBoundary();

<Button
  onClick={() => {
    if (someCondition) {
      // 가장 가까운 ErrorBoundary로 new Error('에러 발생')이 throw됩니다.
      throwError(new Error('에러 발생'));
    }
  }}
/>;
```
