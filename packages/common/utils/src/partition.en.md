# partition

Seperates an array into two arrays based on the `true`/`false` value returned by `predicate`.

```typescript
const [
  // Array elements that return true from predicate (`T[]`)
  first,
  // Array elements that return false from predicate (`T[]`)
  second,
] = partition<T>(
  // Array to be partitioned
  items: T[],
  // Function that determines where to put the element
  predicate: (item: T) => boolean,
);
```

## Example

```typescript
partition([1, 2, 3, 4, 5], x => x < 3); // [[1, 2], [3, 4, 5]]
```
