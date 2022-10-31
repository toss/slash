# useErrorBoundary

React's [error boundary](https://reactjs.org/docs/error-boundaries.html) component cannot catch an error occurred in event handlers, asynchronous code like `setTimeout`, etc.

`useErrorBoundary` is useful to deliver an error to the nearest error boundary in anywhere.

```jsx
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
