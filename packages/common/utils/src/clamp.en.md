---
title: clamp
---

# clamp

Set a lower and upper bound to a value. If the value is smaller than its lower bound, it returns its lower bound. If the value is bigger than its upper bound, it returns its upper bound.

- Caution: When the lower bound is bigger than the upper bound, the `clamp` function throws an error.

```typescript
function clamp(value: number, max: number): number;
function clamp(value: number, min: number, max: number): number;
```

## Examples

```typescript
clamp(3, 1); // 3
clamp(3, 1, 5); // 3
clamp(3, 5); // 3
clamp(7, 3, 5); // 5
```
