---
title: withErrorBoundaryGroup
---

# withErrorBoundaryGroup

Higher-order component that wraps the given component in an `ErrorBoundaryGroup`.
See the documentation for [ErrorBoundaryGroup](https://slash.page/libraries/react/error-boundary/src/errorboundarygroup.i18n) for detailed usage.

## Examples

```jsx
const MyComponent = withErrorBoundaryGroup(Has_Multiple_ErrorBoundary_Compoonent, {
  blockOutside: true,
});
```
