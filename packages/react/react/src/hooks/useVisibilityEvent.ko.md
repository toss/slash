# useVisibilityEvent

document의 visibilitychange 이벤트가 발생하면 callback 함수를 호출합니다.

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
