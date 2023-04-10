# DebounceClick

click event에 debounce를 적용할 수 있는 유틸 컴포넌트입니다.

## Example

```jsx
<DebounceClick wait={200}>
  <Button
    onClick={() => {
      alert('onClick 이벤트 발생');
    }}
  >
    클릭
  </Button>
</DebounceClick>
```
