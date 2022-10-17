---
title: batchRequestsOf
---

비동기 함수 `func`가 짧은 시간 안에 여러 번 실행되어도 한 번만 호출되도록 합니다. 함수 호출의 결과값은 첫 번째 `func` 함수 호출의 결과값이 됩니다.

```typescript
function batchRequestsOf<Func extends (...args: any[]) => any>(
  // 요청을 합칠 함수
  func: Func
): Func;
```

## Examples

```typescript
async function functionToBatch(num: number) {
  return new Promise<number>(resolve => {
    setTimeout(() => {
      resolve(num);
    }, 1000);
  });
}

const batchedFunc = batchRequestsOf(functionToBatch);

batchedFunc(1);
batchedFunc(2);
batchedFunc(1);
```
