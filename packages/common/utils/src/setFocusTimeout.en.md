# setFocusTimeout

Sometimes you want to give input.focus after a certain amount of delay. However, in Mobile Safari, if you do input.focus inside an async function (which is executed using Task Queue), focus doesn't work properly. This is a Hacky function that solves this problem.
Ref: https://stackoverflow.com/questions/12204571/mobile-safari-javascript-focus-method-on-inputfield-only-works-with-click

```typescript
function setFocusTimeout(
  // A callback containing the focus logic to be executed asynchronously
  executeFocus: () => void,
  // How long to delay before executing focus (in ms)
  delay: number
): Promise<boolean>;
```

## Example

```typescript
setFocusTimeout(() => {
  input$.focus();
}, 3000);
```
