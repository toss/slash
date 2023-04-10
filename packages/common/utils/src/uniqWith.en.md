# uniqWith

Removes duplicates from an array, leaving only one identical value. You can pass in a function to determine if they are the same.

```typescript
uniqWith<T>(
  // Array to remove duplicates from
  arr: T[],
  // Function to determine if two elements are equal
  comparator: (x: T, y: T) => boolean
): T[]
```

## Example

```typescript
uniqWith(
  [
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
  ],
  isEqual
); // [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
```
