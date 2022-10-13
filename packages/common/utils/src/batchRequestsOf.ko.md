---
title: batchRequestsOf
---

Make the asynchronous function `func` to be called only once, even if it is called multiple times in a short time frame. The result of the first call is returned to all function invocations.

```typescript
function batchRequestsOf<Func extends (...args: any[]) => any>(
  // The function to batch the invocations
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
