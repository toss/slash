# useForceUpdate

반환된 함수를 실행 시 강제로 리렌더가 실행됩니다.

## Example

```ts
const forceUpdate = useForceUpdate();

const set = useCallback(
  (items: T[]) => {
    listRef.current = items;
    forceUpdate();
  },
  [forceUpdate]
);
```

## Note

https://github.com/streamich/react-use/pull/837 useReducer가 state보다 가볍다는 의견이 있습니다.
