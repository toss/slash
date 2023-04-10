# useInputState

Use when you need a two-way binding to an input.

## Example

```jsx
const [value, handleInputChange] = useInputState('');

return <input value={value} onChange={handleInputChange} />;
```
