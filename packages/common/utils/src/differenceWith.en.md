# differenceWith

Returns the values which is included in the first array (`xs`) but not included in the second array (`ys`).

It receives a function `areItemsEqual`, which specifies when two values are equal.

```typescript
function differenceWith<T>(
  // First array
  xs: T[],
  // Second array
  ys: T[],
  // A function which returns if two values are equal
  areItemsEqual: (x: T, y: T) => boolean
): T[];
```

## Example

```typescript
const xs = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const ys = [{ x: 1, y: 2 }];

differenceWith(xs, ys, (a, b) => a.x === b.x && a.y === b.y); // [{ x: 2, y: 1 }]
```
