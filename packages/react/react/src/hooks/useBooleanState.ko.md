# useBooleanState

boolean 타입으로 useState를 쉽게 사용할 수 있는 hook 입니다.

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
