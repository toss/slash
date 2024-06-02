# useInterval

window.setInterval 를 쉽게 사용할 수 있는 hook 입니다.

```ts
// number 혹은 IntervalOptions를 입력해주세요
type IntervalOptions =
  | number
  | {
      // 각 Effect 사이의 딜레이를 지정합니다.
      delay: number | null;
      // 만약 false로 지정된 경우 Effect를 즉시 실행시킵니다.
      trailing?: boolean;
      // 만약 false인 지정된 경우, Effect가 수행되지 않습니다.
      enabled?: boolean;
    };
```

## Example

```ts
useInterval(updateServerTime, { delay: interval });
```
