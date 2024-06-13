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

# safeSmoothScrollTo

This is the same function as smoothScrollTo, with the prefix 'safe' added.

# smoothScrollTo

Scrolls smoothly.

```typescript
function smoothScrollTo(
  element: Element | Window,
  scrollTo: { top: number },
  // @default { speed: 2000 }
  config: {
    // Scrolling will run for 0.1s < scroll delta / speed < 0.8s. For example, for 1000px and speed = 2000, scrolling will run for 0.5s.
    speed: number
  } | {
    // Runs the scroll for duration (in ms).
    duration: number
  };
)
```

## Example

```typescript
smoothScrollTo(window, { top: 2000 }, { speed: 1000 });
```
