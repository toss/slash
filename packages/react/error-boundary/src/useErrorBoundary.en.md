# useErrorBoundary

Hook used to deliver the error to the nearest `ErrorBoundary`.

```typescript
const throwError = useErrorBoundary();

<Button
  onClick={() => {
    if (someCondition) {
      // Throws `new Error('throw error')` to the nearest `ErrorBoundary`.
      throwError(new Error('throw error'));
    }
  }}
/>;
```
