# usePreservedCallback

Preserves a reference to the given `callback` function as an argument while the component is mounted.

Wraps the given `callback` in React's `Ref` to preserve the reference.

```ts
const callback = usePreservedCallback<Callback>(
  // Functions to preserve references to (type: Callback)
  callback
);
```

## Example

```ts
const callback = usePreservedCallback(() => {
  alert('I never change the reference');
});

useEffect(() => {
  // This Effect is only called once.
  callback();
}, [callback]);
```
