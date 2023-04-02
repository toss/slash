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

# safeSmoothScrollTo

smoothScrollTo와 동일한 함수입니다. safe라는 prefix가 추가되었습니다.

# smoothScrollTo

Smooth하게 Scroll을 합니다.

```typescript
function smoothScrollTo(
  element: Element | Window,
  scrollTo: { top: number },
  // @default { speed: 2000 }
  config: {
    // 스크롤을 0.1s < scroll delta / speed < 0.8s 동안 실행합니다. 예를들면 1000px, speed = 2000 인 경우, 스크롤은 0.5s 동안 실행됩니다.
    speed: number
  } | {
    // 스크롤을 duration (in ms) 동안 실행합니다.
    duration: number
  };
)
```

## Example

```typescript
smoothScrollTo(window, { top: 2000 }, { speed: 1000 });
```
