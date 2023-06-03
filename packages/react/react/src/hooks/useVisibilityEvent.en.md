# useVisibilityEvent

Call the callback function when the document's visibilitychange event occurs.

## Example

```tsx
type VisibilityState = 'hidden' | 'visible';

function MyComponent() {
  const visibleCallbackFunc = (visibilit: VisibilityState) => {
    alert(visibilit);
  };

  useVisibilityEvent(visibleCallbackFunc);
}
```
