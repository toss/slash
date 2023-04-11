# useIsomorphicLayoutEffect

Client-side에서는 useLayoutEffect 방식을 쓰고, Server-side에서는 useEffect 방식을 쓰도록 하는 hook 입니다.

Server-side에서는 useLayoutEffect 함수를 사용하면 warning 오류가 발생하기 때문에 사용하는 함수입니다.

## Example

```ts
useIsomorphicLayoutEffect(() => {
  setSwipeRefreshEnabled(false);
}, []);
```
