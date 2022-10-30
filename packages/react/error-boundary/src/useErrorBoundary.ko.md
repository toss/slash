# useErrorBoundary

가장 가까운 `ErrorBoundary` 에 에러를 전달하기 위해 사용하는 Hook 입니다.

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
