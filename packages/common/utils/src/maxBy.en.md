# maxBy

Returns a maximum value in the given array. If the array is empty, it returns `undefined`.

It receives a function `iteratee`, which specifies a way to calculate the value.

```typescript
function maxBy<T>(collection: T[], iteratee: (element: T) => number): T | undefined;
```

## Example

```typescript
maxBy([{ value: 1 }, { value: 3 }, { value: 2 }], ({ value }) => value); // { value: 3 }
```
