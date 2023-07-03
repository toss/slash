---
title: withErrorBoundaryGroup
---

# withErrorBoundaryGroup

주어진 컴포넌트를 `ErrorBoundaryGroup`로 감싸는 Higher-order component 입니다.
자세한 사용법은 [ErrorBoundaryGroup](https://slash.page/ko/libraries/react/error-boundary/src/ErrorBoundaryGroup.i18n) 에 대한 문서를 참조하세요.

## Examples

```jsx
const MyComponent = withErrorBoundaryGroup(여러_ErrorBoundary가_포함된_컴포넌트, {
  blockOutside: true,
});
```
