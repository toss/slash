# useThrottle

This hook makes it easy to use lodash/throttle.

## Example

```ts
const handleSubmitAnswer = useThrottle(() => {
  setSubmitQuizAnswer();
  mutate();
}, 200);
```
