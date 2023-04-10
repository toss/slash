# useForceUpdate

Running the returned function will force a re-render.

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

https://github.com/streamich/react-use/pull/837 There is an opinion that useReducer is lighter than state.
