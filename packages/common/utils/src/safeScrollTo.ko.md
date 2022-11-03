# safeScrollTo

IE, 구형 안드로이드에선 element.scrollTo 함수가 없는 브라우저에서도 안전하게 스크롤 하기 위한 함수
https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo

```typescript
function safeScrollTo(
  // 스크롤할 요소
  element: Element | Window | null,
  // 스크롤 옵션
  options: ScrollToOptions
): void;
```

## Example

```typescript
safeScrollTo(window, { top: 0, left: 0 });
```
