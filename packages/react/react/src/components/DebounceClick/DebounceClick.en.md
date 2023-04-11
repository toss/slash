# DebounceClick

A utility component that allows you to apply a debounce to a click event.

## Example

```jsx
<DebounceClick wait={200}>
  <Button
    onClick={() => {
      alert('Fires an onClick event');
    }}
  >
    클릭
  </Button>
</DebounceClick>
```
