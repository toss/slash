---
title: chunk
---

# chunk

Chunk an array into small nested arrays, whose maximum length is the given length.

```typescript
function chunk<T>(
  // The array to chunk
  arr: T[],
  // The max length of the nested arrays
  length: number
): T[][];
```

```typescript
chunk([], 3); // --> []
chunk([1, 2, 3], -1); // --> []
chunk([1, 2, 3, 4, 5, 6], 3); // --> [[1, 2, 3], [4, 5, 6]]
chunk([1, 2, 3, 4, 5, 6, 7], 2); // --> [[1, 2], [3, 4], [5, 6], [7]]
```
