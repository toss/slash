---
title: withAsyncBoundary
---

# withAsyncBoundary

Higher-order component that wraps the given component in an `AsyncBoundary`.
See the documentation for `AsyncBoundary` for detailed usage.

## Examples

```jsx
const MyComponent = withAsyncBoundary(Suspense_Creating_Components, {
  // Components to show when loading
  pendingFallback: <div>Loading.</div>,
  // The component to show when an error occurs. The first argument is passed the error that occurred.
  rejectedFallback: error => <div>An error occurred. {error.message}</div>,
});
```
