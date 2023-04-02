# useTimeout

This hook provides a convenient way to use window.setTimeout.

## Example

```ts
useTimeout(() => {
  setTitle(`I'm looking for a product`);
}, 2000);

useTimeout(() => {
  setTitle(`Almost done`);
}, 4000);
```
