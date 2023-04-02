# uniqBy

Removes duplicates from the array, leaving only one identical value. Determines equality based on the value of the `hasher` function.

```typescript
uniqBy<T>(
  // Array to remove duplicates from
  arr: T[],
  // A function to generate a hash to determine if they are the same.
  hasher: (x: T) => unknown
)
```

## Example

```typescript
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], item => item.x); // [{ x: 1 }, { x: 2 }]
```
