---
title: 'assert'
---

# assert

Asserts a condition. This function can be used as a [assertion function](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) in TypeScript.

```typescript
function assert(
  // Condition to assert
  condition: unknown,
  // The error to throw when `condition` is `false`
  // If string is given, it wraps it with `new Error()`.
  // @default new Error()
  error: Error | string
): asserts condition;
```

## Examples

```typescript
let accountId: string | null;

assert(accountId != null, new Error('No "accountId"'));

accountId; // string (type guarded)
```
