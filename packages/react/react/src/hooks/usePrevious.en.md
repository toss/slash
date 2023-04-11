# usePrevious

Returns the value given as an argument one step earlier. If no previous value exists, returns the value given as an argument.

```ts
// value: The value to store
function usePrevious<T>(value): T;
```

## Example

```ts
const { data: stores } = useStores();
const previousStores = usePrevious(stores);
const isStoreChanged = stores !== previousStores;

useEffect(() => {
  if (isStoreChanged) {
    onStoreChange();
  }
}, [isStoreChanged, onStoreChange]);
```
