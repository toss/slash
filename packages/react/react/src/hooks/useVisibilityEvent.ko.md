# useVisibilityEvent

document의 visibilitychange 이벤트가 발생하면 callback 함수를 호출합니다.

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
