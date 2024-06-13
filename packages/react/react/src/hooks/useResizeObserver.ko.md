# useResizeObserver

Ref를 노출하는 컴포넌트에 ResizeObserver를 구독하여 DOM 요소의 크기 변화를 감지합니다.
ResizeObserver API가 요구됩니다. 해당 API가 지원되지 않은 브라우저를 타겟하는 경우 polyfill을 적절히 추가해주세요.

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
