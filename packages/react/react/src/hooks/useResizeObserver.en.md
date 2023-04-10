# useResizeObserver

Subscribes to a ResizeObserver on the component exposing the Ref to detect changes in the size of DOM elements.
The ResizeObserver API is required. If you are targeting browsers that do not support that API, please add polyfill appropriately.

```typescript
function useResizeObserver<E extends HTMLElement = HTMLElement>(onResize: OnResize): EffectRef<E>;
```

## Example

```jsx
const ref =
  useResizeObserver <
  HTMLButtonElement >
  (entry => {
    const { width, height } = entry.contentRect;
    console.log('size changed:', width, height);
  });

<button ref={ref}>...</button>;
```
