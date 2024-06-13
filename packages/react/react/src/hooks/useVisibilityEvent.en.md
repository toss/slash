# useVisibilityEvent

Call the callback function when the document's visibilitychange event occurs.

## Example

```tsx
type VisibilityState = Document['visibilityState'];

function MyComponent() {
  const visibleCallbackFunc = (visibilityState: VisibilityState) => {
    alert(visibilityState);
  };

  useVisibilityEvent(visibleCallbackFunc);
}
```
