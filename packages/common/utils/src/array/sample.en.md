---
title: sample
---

# sample

Selects an arbitrary element from the array.

```typescript
function sample<T>(arr: T[]): T | undefined;
function sample<T>(arr: NonEmptyArray<T>): T;
```

- If the array is empty, it returns `undefined`.
- If the array can be empty (`T[]`), it returns `T | undefined`.
- If the array cannot be empty (`NonEmptyArray<T>`), it returns `T`.
  - Use `isNonEmptyArray` type guard to ensure that the array is not empty.

## Examples

```ts
// undefined
sample([]);

// May return 1 or 2
sample([1, 2]);

// May return '1', '2', or '3'
sample(['1', '2', '3']);
```
