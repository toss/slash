# useThrottle

lodash/throttle 를 쉽게 사용할 수 있는 hook 입니다.

## Example

```ts
const handle정답제출 = useThrottle(() => {
  set퀴즈정답제출();
  mutate();
}, 200);
```
