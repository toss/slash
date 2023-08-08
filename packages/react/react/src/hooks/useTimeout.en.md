# useTimeout

This hook provides a convenient way to use window.setTimeout.

## Example

```tsx
function Example() {
  const [title, setTitle] = useState('');

  useTimeout(() => {
    setTitle(`I'm looking for a product`);
  }, 2000);

  useTimeout(() => {
    setTitle(`Almost done`);
  }, 4000);

  return <h1>{title}</h1>;
}
```
