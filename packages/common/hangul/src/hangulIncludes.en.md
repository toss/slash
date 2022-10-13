---
title: hangulIncludes
---

# hangulIncludes

Check if one hangul string includes another hangul string.

For example, `토스` includes `톳`, and `값이 비싸다` includes `갑` or `빘`.

```typescript
function hangulIncludes(
  // The string to check if it includes the second argument `y`.
  x: string,
  // The string to check if it is included in the first argument `x`.
  y: string
): boolean;
```

## Examples

```typescript
hangulIncludes('토스', ''); // true
hangulIncludes('토스', 'ㅌ'); // true
hangulIncludes('토스', '톳'); // true
hangulIncludes('토스', '톱'); // false
hangulIncludes('토스', '토스'); // true
```
