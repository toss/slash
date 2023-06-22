# useToggleState

boolean 타입의 state를 Toggle로 쉽게 사용할 수 있는 hook 입니다.

```ts
function useToggleState(defaultValue?: boolean): readonly [boolean, () => void];
```

## Example

```ts
const [bool, toggle] = useToggleState(false);
```
