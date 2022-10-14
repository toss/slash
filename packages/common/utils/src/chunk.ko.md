---
title: chunk
---

# chunk

배열을 주어진 길이보다 작은 배열들로 나눕니다.

```typescript
function chunk<T>(
  // 나눌 배열
  arr: T[],
  // 각 내부 배열의 길이
  size: number
): T[][];
```

```typescript
chunk([], 3); // --> []
chunk([1, 2, 3], -1); // --> []
chunk([1, 2, 3, 4, 5, 6], 3); // --> [[1, 2, 3], [4, 5, 6]]
chunk([1, 2, 3, 4, 5, 6, 7], 2); // --> [[1, 2], [3, 4], [5, 6], [7]]
```
