# useErrorBoundary

Hook used to deliver the error to the nearest `ErrorBoundary`.

```typescript
const throwError = useErrorBoundary();

<Button
  onClick={() => {
    if (someCondition) {
      // This parameter will be showed in ErrorBoundary
      throwError(new Error('throw error'));
    }
  }}
/>;
```
