# isSubset

Check if the first array is a subset of the second array

```typescript
function isSubset(a: unknown[], b: unknown[]): boolean;
```

## Examples

```typescript
isSubset([], [1, 2, 3]); // true
isSubset([1, 2], [1, 2, 3]); // true
isSubset([3, 2, 1], [1, 2, 3]); // true
isSubset(['v', 'u'], ['v', 'a', 'l', 'u', 'e']); // true
isSubset([1, 4], [1, 2, 3]); // false
```
