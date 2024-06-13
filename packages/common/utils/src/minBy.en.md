# minBy

Returns a minimum value in the given array. If the array is empty, it returns `undefined`.

It receives a function `iteratee`, which specifies a way to calculate the value.

```typescript
function minBy<T>(collection: T[], iteratee: (element: T) => number): T | undefined;
```

## Example

```typescript
minBy([{ value: 1 }, { value: 3 }, { value: 2 }], ({ value }) => value); // { value: 1 }
```
