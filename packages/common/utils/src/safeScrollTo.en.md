# safeScrollTo

Function to safely scroll even in browsers that do not have element.scrollTo function in IE and older Android
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo

```typescript
function safeScrollTo(
  // element to scroll
  element: Element | Window | null,
  // scroll options
  options: ScrollToOptions
): void;
```

## Example

```typescript
safeScrollTo(window, { top: 0, left: 0 });
```
