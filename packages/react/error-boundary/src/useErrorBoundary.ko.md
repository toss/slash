# useErrorBoundary

리액트의 [`Error Boundary`](https://ko.reactjs.org/docs/error-boundaries.html)는 이벤트 핸들러 등에서 발생한 에러는 인지하지 못합니다.

`useErrorBoundary`를 사용하면 Error Boundary가 인지하지 못하는 에러를 전달해줄 수 있습니다.

```jsx
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
