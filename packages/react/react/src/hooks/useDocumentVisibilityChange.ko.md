# useDocumentVisibilityChange

document의 visibilitychange 이벤트가 발생하면 callback 함수를 호출하고, 인자로 visible 여부를 넘겨줍니다.

## Example

```tsx
function MyComponent() {
  const visibleCallbackFunc = (isVisible: boolean) => {
    alert('isVisible', isVisible);
  };

  useDocumentVisibilityChange(visibleCallbackFunc);
}
```
