# useIsomorphicLayoutEffect

This hook allows you to use the useLayoutEffect method on the client-side and the useEffect method on the server-side.

This function is used because using the useLayoutEffect function on the server-side causes a warning error.

## Example

```ts
useIsomorphicLayoutEffect(() => {
  setSwipeRefreshEnabled(false);
}, []);
```
