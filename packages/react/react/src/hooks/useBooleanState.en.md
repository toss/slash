# useBooleanState

A hook that makes it easy to use useState as a boolean type.

```ts
function useBooleanState(defaultValue = false): readonly [bool, setTrue, setFalse, toggle];
```

## Example

```ts
const [open, openBottomSheet, closeBottomSheet, toggleBottomSheet] = useBooleanState(false);
```
