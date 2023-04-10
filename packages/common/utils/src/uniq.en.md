# uniq

Removes duplicates from an array by leaving only one identical value. Same is determined by the [SameValueZero operation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality).

```typescript
uniq<T>(
  // Array to remove duplicates from
  arr: T[]
): T[]
```

## Example

```typescript
uniq([1, 2, 2, 3]); // [1, 2, 3]
```
