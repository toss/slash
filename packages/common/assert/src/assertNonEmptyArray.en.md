---
title: 'assertNonEmptyArray'
---

# assertNonEmptyArray

Check if an array has at least one element.

Works as TypeScript's [Type Guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) function.

If the array is not empty, it is inferred as an instance of `NonEmptyArray` type. See the `NonEmptyArray` type in `@toss/utils`.

- When using TypeScript's [noUncheckedIndexAccess](https://www.typescriptlang.org/tsconfig#noUncheckedIndexedAccess) option, we have to check whether the array is not empty in order to guarantee that the value is not null.

```typescript
function assertNonEmptyArray<T>(
  // The array to check if it has at least one element
  arr: T[],
  // The error to throw when the array is empty
  // @default new Error('AssertionError: EmptyArray')
  error: Error | string
): asserts arr is NonEmptyArray<T>;
```

## Examples

```typescript
// Throws new Error('AssertionError: EmptyArray').
assertNonEmptyArray([]);
```

```typescript
// Throws new Error('Something is wrong').
assertNonEmptyArray([], new Error('Something is wrong'));
```

```typescript
// Does not throw an error.
assertNonEmptyArray(['hi']);
```
