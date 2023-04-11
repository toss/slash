# useCallbackOnce

Similar to `useCallback`, but runs the callback only once, the first time.

Can be used to define an effect to run only on mount.

## Example

```ts
const openAlert = useCallbackOnce(() => {
  alert('This alert is only called once');
}, []);

useEffect(() => {
  openAlert();
}, [openAlert]);
```
