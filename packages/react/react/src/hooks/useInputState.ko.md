# useInputState

Input에 two way binding이 필요할 때 사용합니다.

## Example

```jsx
const [value, handleInputChange] = useInputState('');

return <input value={value} onChange={handleInputChange} />;
```
