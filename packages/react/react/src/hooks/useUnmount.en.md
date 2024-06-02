# useUnmount

A hook that calls a callback function passed as an argument when the component is `unmounted`.

```ts
function useUnmount(callback: () => void): void
```

## Example

```ts
useUnmount(() => {
  console.log("unmount");
});
```
