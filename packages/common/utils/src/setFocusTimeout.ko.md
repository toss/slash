# setFocusTimeout

일정 시간의 delay 후에 input.focus를 주고 싶은 경우가 있습니다. 하지만, Mobile Safari에서 async function 내에서 input.focus를 할 경우(Task Queue를 이용해 실행되는) focus가 제대로 작동하지 않습니다. Hacky하게 이 문제를 해결하는 함수입니다.
Ref: https://stackoverflow.com/questions/12204571/mobile-safari-javascript-focus-method-on-inputfield-only-works-with-click

```typescript
function setFocusTimeout(
  // async하게 실행할 focus 로직이 포함된 callback
  executeFocus: () => void,
  // focus를 실행하기 전에 지연시킬 시간(단위: ms)
  delay: number
): Promise<boolean>;
```

## Example

```typescript
setFocusTimeout(() => {
  input$.focus();
}, 3000);
```
