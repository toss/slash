# useUnmount

컴포넌트가 `unmount`될 때 인자로 넘겨준 콜백 함수를 호출하는 훅입니다.

```ts
function useUnmount(callback: () => void): void
```

## Example

```ts
useUnmount(() => {
  console.log("unmount");
});
```
