# useDocumentVisibilityChange

Call the callback function when the document's visibilitychange event occurs and pass the visibility of document in parameter

## Example

```tsx
function MyComponent() {
  const visibleCallbackFunc = (isVisible: boolean) => {
    alert('isVisible', isVisible);
  };

  useDocumentVisibilityChange(visibleCallbackFunc);
}
```
