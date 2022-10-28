# difference

Returns the values which is included in the first array (`xs`) but not included in the second array (`ys`).

```typescript
function difference<T>(
  // First array
  xs: T[],
  // Second aray
  ys: T[]
): T[];
```

## Example

```typescript
difference([1, 2, 3], [1, 2]); // [3]
```
