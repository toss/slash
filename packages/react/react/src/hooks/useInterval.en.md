# useInterval

This hook makes it easy to use window.setInterval.
Stop and resume interval with 'resume' and 'stop'.
```ts
// Please enter a number or IntervalOptions
type IntervalOptions =
  | number
  | {
      // Specifies the delay between each Effect.
      delay: number | null;
      // If it is specified as false, the Effect will run immediately.
      trailing?: boolean;
    };
```

## Example

```ts
const { intervalRunning, stop, continueTimer } = useInterval(updateServerTime, { delay: interval });
```
