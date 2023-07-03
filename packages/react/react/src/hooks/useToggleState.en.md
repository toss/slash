# useToggleState

A hook to easily toggle a boolean type of state.

```ts
function useToggleState(defaultValue?: boolean): readonly [boolean, () => void];
```

## Example

```ts
const [bool, toggle] = useToggleState(false);
```
