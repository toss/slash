# useTimeout

window.setTimeout 를 편리하게 이용할 수 있는 hook 입니다.

## Example

```ts
useTimeout(() => {
  setTitle(`상품을 찾고있어요`);
}, 2000);

useTimeout(() => {
  setTitle(`거의 다 끝났어요`);
}, 4000);
```
