# useBooleanState

A hook that makes it easy to use useState as a boolean type.

```ts
function useBooleanState(defaultValue = false): {
  readonly bool: boolean;
  readonly setTrue: () => void;
  readonly setFalse: () => void;
  readonly toggle: () => void;
};
```

## Example

```ts
const {
  bool: open,
  setTrue: openBottomSheet,
  setFalse: closeBottomSheet,
  toggle: toggleBottomSheet,
} = useBooleanState(false);
```
