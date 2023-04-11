# useBooleanState

boolean 타입으로 useState를 쉽게 사용할 수 있는 hook 입니다.

```ts
function useBooleanState(defaultValue = false): readonly [bool, setTrue, setFalse, toggle];
```

## Example

```ts
const [open, openBottomSheet, closeBottomSheet, toggleBottomSheet] = useBooleanState(false);
```
